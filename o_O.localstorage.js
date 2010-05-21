if(typeof localStorage === 'object')
{
  // We're storing locally, baby!
  o_O.localstorage = {
    save: function(object)
    {
      object._type = object.model_name;
      localStorage.setItem(object.id, object.to_json());
    },
    find: function(id)
    {
      return JSON.parse(localStorage.getItem(id));
    }
  }
}