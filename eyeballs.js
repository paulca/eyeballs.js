var eyeballs = {
  initialize: function(name){
    return eyeballs.register_or_load_model(name)
  },
  registered_models: {},
  register_or_load_model: function(name){
    var initialize, load, register;
    
    var initialize = function(attrs){
      return {
        collection_selector: function(){
          return "[data-collection=" + name + "]";
        },
        to_html: function(){
          var out;
          out = [];
          for(attr in attrs)
          {
            if(attrs.hasOwnProperty(attr))
            {
              out.push(attr + ': ' + attrs[attr])
            }
          }
          return out.join(', ')
        }
      }
    }
    
    load_model = function(){
      return {
        empty_collection: function(){
          return '<p data-empty="true">No ' + name.toLowerCase() + 's here.</p>'
        },
        create: function(attrs){
          eyeballs.dom_adapter.add_to_collection(initialize(attrs));
        }
      };
    }
    
    register_model = function(){
      eyeballs.registered_models[name] = {}
      eyeballs.dom_adapter.initialize_collections(name)
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