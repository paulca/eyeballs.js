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
      this.errors = [];
      for(i = 0; i < this.validations.presence.length; i++)
      {
        var field = this.validations.presence[i];
        if(this[field] == '' || this[field] == null)
        {
          var message = field + ' should be present';
          this.errors.push({field: field, type: 'presence', message: message})
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
    update_attributes: function(attributes){
      for(var attribute in attributes)
      {
        this[attribute] = attributes[attribute];
      }
      return this.save();
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
      attributes['id'] = o_O.uuid();
      return attributes;
    },
    find: function(id){
      var object = {};
      template = $('[data-id=' + id + ']');
      return this.initialize(o_O.find_attributes(template, function(field){
        return field.text();
      }));
    }
  }
  
  return initializer_methods;
}

o_O.find_attributes = function(template, callback){
  var object = {};
  for(i = 0; i<template.find('[data-attribute]').length; i++)
  {
    field = $(template.find('[data-attribute]')[i]);
    object[field.attr('data-attribute')] = callback(field);
  }
  return object;
}

o_O.form = {
  attributes: function(form){
    return o_O.find_attributes(form, function(field){
      return field.val();
    })
  }
}

o_O.templates = {}

o_O.get_template = function(template, callback){
  if(o_O.templates[template])
  {
    callback(o_O.templates[template]);
  }
  else
  {
    $.get('views/' + template + '.html.mustache', callback);
  }
}

o_O._uuid_default_prefix = '';

o_O._uuidlet = function () {
  return(((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

o_O.uuid = function (p) {
  if (typeof(p) == 'object' && typeof(p.prefix) == 'string') {
    o_O._uuid_default_prefix = p.prefix;
  } else {
    p = p || o_O._uuid_default_prefix || '';
    return(p+o_O._uuidlet()+o_O._uuidlet()+"-"+o_O._uuidlet()+"-"+o_O._uuidlet()+"-"+o_O._uuidlet()+"-"+o_O._uuidlet()+o_O._uuidlet()+o_O._uuidlet());
  };
};