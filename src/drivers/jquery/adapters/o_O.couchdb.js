// We're relaxing, baby!
o_O.couchdb = {
  all: function(model, callback){
    
    var database = o_O.model.adapter.settings.database;
    
    var ddoc_id = ['_design', model.table_name].join('/');
    var view_name = model.table_name + '/all';
    var get_all_documents = function(result){
      var documents = result.rows;
      var all_documents = [];
      for(var i = 0; i < documents.length; i++)
      {
        var document = documents[i];
        document.value.id = document.id
        all_documents.push(document.value);
      }
      if(typeof callback === 'function')
      {
        callback(all_documents);
      }
    }
    $.couch.db(database).view(view_name, {
      success:get_all_documents,
      error: function(){
        // create the doc
        var design_doc = {
           "_id": ddoc_id,
           "language": "javascript",
           "views": {
               "all": {
                   "map": "function(doc) {\n  if(doc.model_name === \
                     '" + model.model_name + "')\n    emit(null, doc);\n}"
               }
           }
        }
        $.couch.db(database).saveDoc(design_doc, {success:function(){
          $.couch.db(database).view(view_name, {
            success: get_all_documents,
            error: function(){
              if(typeof console === 'object')
              {
                console.log("Design Doc couldn't be written");
              }
            }
          })
        }})
      }
    });
  },
  destroy: function(object, callback){
    var database = o_O.model.adapter.settings.database;
    this.find(object, object.id, function(found){
      var url = '/' + o_O.model.adapter.settings.database + '/' + object.id;
      $.ajax({
                type: 'DELETE',
                url: '/' + database + '/' + object.id + '?rev=' + found._rev,
                success: function(data){
                           var response = JSON.parse(data);
                             if(typeof callback === 'function')
                             {
                               callback(response);
                             }
                           }
      });
    });
  },
  save: function(object, callback)
  {
    var database = o_O.model.adapter.settings.database;
    var object_to_save = {}
    
    // we only want the attributes, not all extra model data
    for(var i = 0; i < object.attributes.length; i++)
    {
      object_to_save[object.attributes[i]] = object[object.attributes[i]];
    }
    object_to_save._id = object.id;
    object_to_save.model_name = object.model_name;
    $.couch.db(database).saveDoc(object_to_save, { 
      success:function(response){
        object_to_save._rev = response.rev;
        object_to_save._id = response.id;
        object_to_save.id = response.id;
        if(typeof callback === 'function')
        {
          callback(object_to_save);
        }
      }
    });
  },
  table: function(object)
  {
    
  },
  find: function(model, id, callback)
  {
    var database = o_O.model.adapter.settings.database;
    $.couch.db(database).openDoc(id, {success: function(document){
      document.id = id;
      if(typeof callback === 'function')
      {
        callback(document);
      }
    }});
  }
}
