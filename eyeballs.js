var eyeballs = {
  hooks: {
    run_hooks: function(context, arg){
      var i;
      for(i = 0; i < eyeballs.hooks[context].length; i = i+1)
      {
        if(typeof eyeballs.hooks[context][i] === 'function')
        {
          eyeballs.hooks[context][i](arg);
        }
      }
    },
    add: function(methods){
      for(method in methods){ if(methods.hasOwnProperty(method)){
        if(eyeballs.hooks.hasOwnProperty(method))
        {
          eyeballs.hooks[method + '_hooks'].push(methods[method]);
        }
      }}
    },
    after_initialize: function(name){
      this.run_hooks('after_initialize_hooks', name);
    },
    after_initialize_hooks: [],
    after_create: function(name){
      this.run_hooks('after_create_hooks', name);
    },
    after_create_hooks: [],
    after_destroy: function(name){
      this.run_hooks('after_destroy_hooks', name);
    },
    after_destroy_hooks: [],
    after_update: function(name){
      this.run_hooks('after_update_hooks', name);
    },
    after_update_hooks: []
  },
  initialize: function(name){
    return eyeballs.register_or_load_model(name)
  },
  registered_models: {},
  register_or_load_model: function(name){
    var initialize, load, register;
    
    var initialize = function(attrs){
      if(!attrs.hasOwnProperty('id'))
      {
        attrs.id = +new Date();
      }
      return {
        collection_selector: function(){
          return "[data-collection=" + name + "]";
        },
        destroy: function(){
          eyeballs.hooks.after_destroy(this);
          delete eyeballs.registered_models[name][attrs.id];
        },
        get: function(attr)
        {
          return attrs[attr];
        },
        instance_selector: function(){
          return "[data-model=" + name + "][data-id=" + attrs.id + "]";
        },
        model_name: function(){
          return name;
        },
        save: function(){
          eyeballs.registered_models[name][attrs.id] = attrs;
        },
        set: function(attr, value){
          attrs[attr] = value;
          eyeballs.hooks.after_update(this);
        },
        to_html: function(){
          var out;
          out = [];
          for(attr in attrs) { if(attrs.hasOwnProperty(attr)){
            out.push(attr + ': ' + attrs[attr])
          }}
          return '<p data-model="' + name + '"' + 
                 'data-id="' + attrs.id + '">' + out.join(', ') + '</p>';
        },
        update_attributes: function(updated_attrs){
          for(attr in updated_attrs) { if(updated_attrs.hasOwnProperty(attr)){
            attrs[attr] = updated_attrs[attr];
          }}
          eyeballs.hooks.after_update(this);
          return this;
        }
      }
    }
    
    load_model = function(){
      return {
        all: function(){
          var records;
          records = [];
          for(record in eyeballs.registered_models[name]){
            if(eyeballs.registered_models[name].hasOwnProperty(record))
            {
              records.push(
                initialize(eyeballs.registered_models[name][record])
              );
            }
          }
          return records;
        },
        empty_collection: function(){
          return '<p data-empty="true">No ' + name.toLowerCase() + 's here.</p>'
        },
        create: function(attrs){
          var model;
          model = initialize(attrs);
          model.save();
          eyeballs.hooks.after_create(model);
          return model;
        },
        find: function(id){
          if(eyeballs.registered_models[name].hasOwnProperty(id))
          {
            return initialize(eyeballs.registered_models[name][id])
          }
          else
          {
            return [];
          }
        }
      };
    }
    
    register_model = function(){
      eyeballs.registered_models[name] = {}
      eyeballs.hooks.after_initialize(name)
      return load_model(name);
    }
    
    if(this.registered_models.hasOwnProperty(name))
    {
      return load_model(name)
    }
    else
    {
      return register_model(name)
    }
  }
}

var o_O = eyeballs.initialize;