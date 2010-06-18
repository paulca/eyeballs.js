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
    object.destroyed = true;
    $.ajax({
      type: 'DELETE',
      url: '/' + object.table_name + '/' + object.id,
      success: function(){
        if(typeof callback === 'function')
        {
          callback(object);
        }
      }
    })
  },
  save: function(object, callback)
  {
    var object_to_save = {}
    for(var i = 0; i < object.attributes.length; i++)
    {
      object_to_save[object.attributes[i]] = object[object.attributes[i]];
    }
    var respond = function(response){
      var saved_object = JSON.parse(response);
      for(var attribute in saved_object)
      {
        object_to_save[attribute] = saved_object[attribute];
      }
      object_to_save.new_record = false;
      if(typeof callback === 'function')
      {
        callback(object_to_save);
      }
    }
    if(object.new_record)
    {
      $.post('/' + object.table_name, object_to_save, respond);
    }
    else
    {
      $.ajax({
        type: 'PUT',
        url: '/' + object.table_name + '/' + object.id,
        success: respond
      })
    }
  },
  find: function(model, id, callback, options)
  {
    var url = '/' + model.table_name + '/' + id;
    if(typeof options === 'object' && options.prefix)
    {
      url = options.prefix + url;
    }
    $.get(url, function(response){
      var retrieved_object = JSON.parse(response);
      if(typeof callback === 'function')
      {
        retrieved_object.new_record = false;
        callback(retrieved_object);
      }
    })
  }
}
