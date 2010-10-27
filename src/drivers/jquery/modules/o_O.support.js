o_O.find_attributes = function(template, callback){
  var object = {};
  for(i = 0; i<template.find('[data-attribute]').length; i++)
  {
    field = $(template.find('[data-attribute]')[i]);
    object[field.attr('data-attribute')] = callback(field);
  }
  return object;
}

o_O.params_from_form = function(form){
  return $.deparam(form.serialize());
}

o_O.params = function(param, new_value){
  if(new_value != void(0))
  {
    o_O.params.collection[param] = new_value;
    return new_value;
  }
  if(typeof param === 'string')
  {
    return o_O.params.collection[param];
  }
  return o_O.params.collection;
}

o_O.params.collection = {}

$(function(){
  $('body').delegate('form', 'submit', function(){
    for(param in o_O.params_from_form($(this)))
    {
      o_O.params(param, o_O.params_from_form($(this))[param]);
    }
  })
})
  
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
      if(options.replace)
      {
        $(options.replace).replaceWith(rendered);
      }
      if(options.html)
      {
        $(options.html).html(rendered);
      }
      if(options.before)
      {
        $(options.html).before(rendered);
      }
      if(options.after)
      {
        $(options.html).after(rendered);
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