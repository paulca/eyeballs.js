if(typeof localStorage === 'object')
{
  // We're storing locally, baby!
  o_O.localstorage = {
    save: function(object)
    {
      console.log(object.id);
      localStorage.setItem(object.id, object.to_json());
    }
  }
}