o_O.dom = {
  save: function(object, callback){
    if(typeof callback === 'function')
    {
      callback(object);
    }
    return object;
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
    var new_object;
    if(typeof callback === 'function')
    {
      new_object = model.initialize(o_O.find_attributes(template, function(field){return field.text();}));
      new_object.id = id;
      callback(new_object);
    }
    return new_object;
  }
}