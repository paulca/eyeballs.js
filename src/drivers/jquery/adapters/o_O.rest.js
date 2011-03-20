// REST & Rails, woop!
o_O.rest = {
  include_json_root: function(object){
    return !!( o_O.config.include_json_root && 
          window[object.model_name]['include_json_root'] == void(0)) ||
        ( window[object.model_name]['include_json_root'] === true )
  },
  figure_url: function(original_callback, object){
    if(typeof original_callback.url === 'string')
    {
      return original_callback.url;
    }
    else if(typeof window[object.model_name]['url'] === 'string')
    {
      return window[object.model_name]['url'];
    }
    else
    {
      return '/' + object.table_name;
    }
  },
  all: function(model, callback, original_callback){
    var include_json_root = this.include_json_root(model);
    $.get(this.figure_url(original_callback, model), function(response, textStatus, xhr){
      var documents;
      try {
        documents = JSON.parse(response);
      }
      catch(e){
        documents = response
      }
      
      if(include_json_root)
      {
        var out = [];
        for(i=0; i<documents.length;i++)
        {
          documents[i] = documents[i][model.model_name.underscore()]
        }
      }
      
      if(typeof callback === 'function')
      {
        callback(documents, response, xhr);
      }
    })
  },
  destroy: function(object, callback, original_callback){
    object.destroyed = true;
    $.ajax({
      type: 'DELETE',
      url: this.figure_url(original_callback, object) + '/' + object.id,
      success: function(response, textStatus, xhr){
        if(typeof callback === 'function')
        {
          callback(object, response, xhr);
        }
      }
    })
  },
  save: function(object, callback, original_callback)
  {
    var object_to_save = {};
    var url;
    var include_json_root = this.include_json_root(object)
    for(var i = 0; i < object.attributes.length; i++)
    {
      object_to_save[object.attributes[i]] = object[object.attributes[i]];
    }
    var respond = function(response, textStatus, xhr){
      try{
        if(typeof response === 'string') {
          response = JSON.parse(response);
        }

        var saved_object = null;
        if(include_json_root) {
          saved_object = response[object.model_name.underscore()];
        } else {
          saved_object = response;
        }

        for(var attribute in saved_object)
        {
          object_to_save[attribute] = saved_object[attribute];
        }
        object_to_save.new_record = false;
      }
      catch(e){
        // keep the ID persistent
        object_to_save.id = object.id;
      }
      if(typeof callback === 'function')
      {
        callback(object_to_save, response, xhr);
      }
    }
    url = this.figure_url(original_callback, object);

    if(this.include_json_root(object))
    {
      var object_name;
      new_object_to_save = {};
      if(typeof window[object.model_name]['json_root_name'] === 'string')
      {
       object_name = window[object.model_name]['json_root_name'];
      }
      else
      {
        object_name = object.model_name.underscore();
      }
      new_object_to_save[object_name] = object_to_save;
      object_to_save = new_object_to_save;
    }
    if(typeof o_O.config.authenticity_token === 'string')
    {
      object_to_save['authenticity_token'] = o_O.config.authenticity_token;
    }
    if(object.new_record)
    {
      $.post(url, object_to_save, respond);
    }
    else
    {
      $.ajax({
        type: 'PUT',
        data: object_to_save,
        url: url + '/' + object.id,
        success: respond
      })
    }
  },
  find: function(model, id, callback, options)
  {
    var url = this.figure_url(options, model) + '/' + id;
    var include_json_root = this.include_json_root(model)
    $.get(url, function(response, textStatus, xhr){
      try{
        if(typeof response === 'object')
        {
          var retrieved_object = response;
        }
        else
        {
          var retrieved_object = JSON.parse(response);
        }
        if(include_json_root)
        {
          retrieved_object = retrieved_object[model.model_name.underscore()]
        }
      }
      catch(e){
        var retrieved_object = model.initialize({id: id});
      }
      if(typeof callback === 'function')
      {
        retrieved_object.new_record = false;
        callback(retrieved_object, response, xhr);
      }
    })
  }
}

o_O.config.rest = {}