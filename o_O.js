var o_O = function(callback){
  
  class_methods = {
    validations: {presence: []},
    validates_presence_of: function(field){
      this.validations.presence.push(field);
    }
  }
  
  var config = callback(class_methods);
  
  instance_methods = {
    save: function(){
      for(i = 0; i < this.validations.presence.length; i++)
      {
        var field = this.validations.presence[i];
        if(this[field] == '' || this[field] == null)
        {
         this.errors.push(field + " should be present")
        }
      }
      if(this.errors.length == 0)
      {
        return true;
      }
      else
      {
        return false;
      }
    },
    errors: [],
    validations: class_methods.validations
  }
  
  initializer_methods = {
    initialize: function(attributes){
      if(!attributes) { var attributes = {}; };
      for ( var method in instance_methods ) {
        attributes[method] = instance_methods[method];
      }
      return attributes;
    }
  }
  
  return initializer_methods;
}

o_O.form = {
  attributes: function(form){
    var object = {};
    for(i = 0; i<form.find('input[data-attribute]').length; i++)
    {
      field = $(form.find('input[data-attribute]')[i]);
      object[field.attr('data-attribute')] = field.val();
    }
    return object;
  }
}