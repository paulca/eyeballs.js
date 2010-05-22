// We're relaxing, baby!
o_O.couchdb = {
  all: function(model){
    
  },
  destroy: function(object){
    
  },
  save: function(object)
  {
    var database = o_O.model.adapter.settings.database;
    var object_to_save = {}
    for(var i = 0; i < object.attributes.length; i++)
    {
      object_to_save[object.attributes[i]] = object[object.attributes[i]];
    }
    object_to_save._id = object.id;
    object_to_save.model_name = object.model_name;
    $.couch.db(database).saveDoc(object_to_save);
  },
  table: function(object)
  {
    
  },
  find: function(model, id)
  {
    var url = '/' + o_O.model.adapter.settings.database + '/' + id;
    var response = $.ajax({url: url, type: 'GET', async: false}).responseText;
    var object = JSON.parse(response);
    object.id = id;
    return object;
  }
}
