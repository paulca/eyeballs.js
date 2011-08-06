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
  initialize: function(name, initializer){
    return eyeballs.register_or_load_model(name, initializer)
  },
  registered_models: {},
  register_or_load_model: function(name, initializer){
    var initialize_functions, initialize, load, register;
    
    initialize_functions = {
      to_html: function(){
        if(arguments.length === 1)
        {
          callback = arguments[0];
          context = 'default';
        }
        else
        {
          context = arguments[0];
          callback = arguments[1];
        }
        eyeballs.registered_models[name]['html'][context] = callback;
      },
      collection_selector: function(callback){
        eyeballs.registered_models[name]['collection_selector'] = callback;
      },
      instance_selector: function(callback){
        eyeballs.registered_models[name]['instance_selector'] = callback;
      }
    }
    
    initialize = function(attrs){
      if(!attrs.hasOwnProperty('id'))
      {
        attrs.id = +new Date();
      }
      return {
        collection_selector: function(){
          if(typeof eyeballs.registered_models[name]['collection_selector'] ===
             'function')
          {
            return eyeballs.registered_models[name]['collection_selector'](
                     name, attrs);
          }
          else
          {
            return "[data-collection=" + name + "]";
          }
        },
        destroy: function(){
          eyeballs.hooks.after_destroy(this);
          delete eyeballs.registered_models[name]['data'][attrs.id];
        },
        get: function(attr)
        {
          return attrs[attr];
        },
        instance_selector: function(){
          if(typeof eyeballs.registered_models[name]['instance_selector'] ===
             'function')
          {
            return eyeballs.registered_models[name]['instance_selector'](
                     name, attrs);
          }
          else
          {
            return "[data-model=" + name + "][data-id=" + attrs.id + "]";
          }
        },
        model_name: function(){
          return name;
        },
        save: function(){
          eyeballs.registered_models[name]['data'][attrs.id] = attrs;
        },
        set: function(attr, value){
          attrs[attr] = value;
          eyeballs.hooks.after_update(this);
        },
        to_html: function(context){
          if(context === void(0))
          {
            context = 'default';
          }
          var out;
          out = [];
          for(attr in attrs) { if(attrs.hasOwnProperty(attr)){
            out.push(attr + ': ' + attrs[attr])
          }}
          if(typeof eyeballs.registered_models[name]['html'][context] ===
             'function')
          {
            return eyeballs.registered_models[name]['html'][context](attrs)
          }
          else
          {
            return '<p data-model="' + name + '"' + 
                   'data-id="' + attrs.id + '">' + out.join(', ') + '</p>';
          }
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
        all: function(callback){
          var records;
          records = [];
          for(record in eyeballs.registered_models[name]['data']){
            if(eyeballs.registered_models[name]['data'].hasOwnProperty(record))
            {
              var initialized_record;
              initialized_record = initialize(
                eyeballs.registered_models[name]['data'][record]
              )
              if(typeof callback === 'function')
              {
                callback(initialized_record)
              }
              records.push(initialized_record);
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
          if(eyeballs.registered_models[name]['data'].hasOwnProperty(id))
          {
            return initialize(eyeballs.registered_models[name]['data'][id])
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
      eyeballs.registered_models[name]['data'] = {}
      eyeballs.registered_models[name]['html'] = {}
      if(typeof initializer === 'function')
      {
        initializer.apply(initialize_functions)
      }
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