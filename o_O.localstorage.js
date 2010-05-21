if(typeof localStorage === 'object')
{
  // We're storing locally, baby!
  o_O.localstorage = {
    all: function(model_name){
      var all_objects = []
      for(var i = 0; i < localStorage.length; i++)
      {
        var key = localStorage.key(i);
        var object = JSON.parse(localStorage.getItem(key))
        if(object._model_name === model_name)
        {
          all_objects.push(object)
        }
      }
      return all_objects;
    },
    destroy: function(object){
      localStorage.removeItem(object.id);
    },
    save: function(object)
    {
      object._model_name = object.model_name;
      localStorage.setItem(object.id, object.to_json());
    },
    find: function(id)
    {
      object = JSON.parse(localStorage.getItem(id));
      object.id = id;
      return object;
    }
  }
}