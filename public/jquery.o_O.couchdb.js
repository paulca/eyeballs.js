// We're relaxing, baby!
o_O.couchdb = {
  all: function(model){
    
    var database = o_O.model.adapter.settings.database;
    
    var parts = [ 
      database, '_design', model.table_name
      ]
    
    var ddoc_url = '/' + parts.join('/');
    var all_url = '/' + parts.join('/') + '/_view/all';
    var response = $.ajax({url: all_url, type: 'GET', async: false}).responseText;
    var responseObject = JSON.parse(response);
    if(responseObject.error === 'not_found')
    {
      // create the doc
      var design_doc = {
         "_id": "_design/reviews",
         "language": "javascript",
         "views": {
             "all": {
                 "map": "function(doc) {\n  if(doc.model_name === 'Review')\n    emit(null, doc);\n}"
             }
         }
      }
      $.couch.db(database).saveDoc(design_doc)
      var response = $.ajax({url: all_url, type: 'GET', async: false}).responseText;
    }
    else
    {
      var documents = JSON.parse(response).rows;
    }
    
    var documents = JSON.parse(response).rows;
        var all_documents = []
        for(var i = 0; i < documents.length; i++)
        {
          var document = documents[i];
          document.value.id = document.id
          all_documents.push(document.value);
        }
    return all_documents;
  },
  destroy: function(object, callback){
    var database = o_O.model.adapter.settings.database;
    var current = this.find(object, object.id);
    var url = '/' + o_O.model.adapter.settings.database + '/' + object.id;
    $.ajax({
              type: 'DELETE',
              url: '/' + database + '/' + object.id + '?rev=' + current._rev,
              success: function(data){
                         var response = JSON.parse(data);
                           if(typeof callback === 'function')
                           {
                             callback(response);
                           }
                         }
    });
    return object;
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
