o_O.dom = {
  save: function(object, callback){
    if(typeof callback === 'function')
    {
      callback(object)
    }
  },
  all: function(model, callback){
    var output = [];
    $('[data-model=' + model.model_name + ']').each(function(){
      output.push(model.initialize(o_O.find_attributes($(this), function(field) { return field.text();})))
    })
    if(typeof callback === 'function')
    {
      callback(output);
    }
  },
  destroy: function(object, callback){
    $('[data-model=' + object.model_name +'][data-id= ' + object.id + ']').remove()
    if(typeof callback === 'function')
    {
      callback(object);
    }
  },
  find: function(model, id, callback){
    var template = $('[data-model=' + model.model_name + '][data-id=' + id + ']');
    if(typeof callback === 'function')
    {
      
      var new_object = model.initialize(o_O.find_attributes(template, function(field){return field.text();}));
      new_object.id = id;
    //   console.log(new_object)
      callback(new_object);
    }
  }
}