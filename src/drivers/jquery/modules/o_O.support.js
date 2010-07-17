o_O.find_attributes = function(template, callback){
  var object = {};
  for(i = 0; i<template.find('[data-attribute]').length; i++)
  {
    field = $(template.find('[data-attribute]')[i]);
    object[field.attr('data-attribute')] = callback(field);
  }
  return object;
}

o_O.params = function(form){
    return o_O.find_attributes(form, function(field){
      if(field.is('[type=radio]'))
      {
        return $('[data-attribute=' + field.attr('data-attribute') + ']:checked').val()
      }
      else
      {
        return field.val();
      }
    });
  }
  
o_O.render = function(template, data, options){
  o_O.get_template(template, data, function(data, template){ 
    var rendered = Mustache.to_html(template, data);
    if(typeof options === 'object')
    {
      if(options.append)
      {
        $(options.append).append(rendered);
      }
      if(options.prepend)
      {
        $(options.prepend).prepend(rendered);
      }
    }
  });
}

o_O.get_template = function(template, data, callback){
  if(o_O.templates[template])
  {
    callback(data, o_O.templates[template]);
  }
  else
  {
    var url;
    if(o_O.config.template_path)
    {
      url = o_O.config.template_path + '/';
    }
    else
    {
      url = 'app/views/'
    }
    $.get(url + template + '.html.mustache', function(response){
      o_O.templates[template] = response;
      callback(data, response);
    });
  }
}

if(typeof String.prototype.capitalize === 'undefined')
{
  String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  }
}

if(typeof String.prototype.underscore === 'undefined')
{
  String.prototype.underscore = function(){
    return this.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  }
}

if(typeof String.prototype.blank === 'undefined')
{
  String.prototype.blank = function(){
    return /^\s*$/.test(this);
  }
}

String.prototype.o_O_trim = function(chars) {
  return this.replace(new RegExp("(^[" + chars + "]+|[" + chars + "]+$)", "g"), '')
}