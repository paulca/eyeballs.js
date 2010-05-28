// REST & Rails, woop!
o_O.rails = {
  all: function(model, callback){
    $.get('/' + model.table_name, function(response){
      var documents = JSON.parse(response);
      if(typeof callback === 'function')
      {
        callback(documents);
      }
    })
  },
  destroy: function(object, callback){
    if(typeof callback === 'function')
    {
      callback(response);
    }
  },
  save: function(object, callback)
  {
    var object_to_save = {}
    for(var i = 0; i < object.attributes.length; i++)
    {
      object_to_save[object.attributes[i]] = object[object.attributes[i]];
    }
    $.post('/' + object.table_name, object_to_save, function(response){
      var saved_object = JSON.parse(response);
      for(var attribute in saved_object)
      {
        object[attribute] = saved_object[attribute];
      }
      if(typeof callback === 'function')
      {
        callback(object);
      }
    })
  },
  table: function(object)
  {
    
  },
  find: function(model, id, callback)
  {
    $.get('/' + model.table_name + '/' + id, function(response){
      var retrieved_object = JSON.parse(response);
      if(typeof callback === 'function')
      {
        callback(retrieved_object);
      }
    })
  }
}
