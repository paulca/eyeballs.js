var eyeballs = {
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
          eyeballs.dom_adapter.destroy(this)
        },
        get: function(attr)
        {
          return attrs[attr];
        },
        instance_selector: function(){
          return "[data-model=" + name + "]";
        },
        model_name: function(){
          return name;
        },
        save: function(){
          eyeballs.registered_models[name][attrs.id] = attrs;
        },
        set: function(attr, value){
          attrs[attr] = value;
          eyeballs.dom_adapter.update(this);
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
          for(attr in updated_attrs) { if(attrs.hasOwnProperty(attr)){
            attrs[attr] = updated_attrs[attr];
          }}
          eyeballs.dom_adapter.update(this)
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
          eyeballs.dom_adapter.add_to_collection(model);
          return model;
        },
        find: function(id){
          return initialize(eyeballs.registered_models[name][id])
        }
      };
    }
    
    register_model = function(){
      eyeballs.registered_models[name] = {}
      eyeballs.dom_adapter.initialize_collections(name)
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