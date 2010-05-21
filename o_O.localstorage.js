if(typeof localStorage === 'object')
{
  // We're storing locally, baby!
  o_O.localstorage = {
    all: function(model){
      var all_objects = []
      for(var record in this.table(model))
      {
        all_objects.push(this.table(model)[record]);
      }
      return all_objects;
    },
    destroy: function(object){
      var table = this.table(object)
      delete table[object.id]
      localStorage.setItem(object.table_name, JSON.stringify(table))
    },
    save: function(object)
    {
      var all = this.table(object)
      all[object.id] = object;
      localStorage.setItem(object.table_name, JSON.stringify(all))
    },
    table: function(object)
    {
      var all;
      var stored_all = localStorage.getItem(object.table_name);
      if(stored_all == null)
      {
        return {};
      }
      else
      {
        return JSON.parse(stored_all);
      }
    },
    find: function(model, id)
    {
      var object = this.table(model)[id]
      object.id = id;
      return object;
    }
  }
}