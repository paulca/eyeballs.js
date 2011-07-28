var eyeballs = {
  initialize: function(name){
    return eyeballs.register_or_load_model(name)
  },
  registered_models: {},
  register_or_load_model: function(name){
    var load, register;
    
    load_model = function(){
      return {
        empty_collection: function(){
          return 'No ' + name.toLowerCase() + 's here.'
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