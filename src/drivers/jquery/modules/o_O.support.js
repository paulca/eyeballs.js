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

o_O.extend = function(target, object) {
  return $.extend(target, object);
};

o_O.event_handler = function() {
  return $({});
};

o_O.params.collection = {}

$(function(){
  $('body').delegate('form', 'submit', function(){
    for(param in o_O.params_from_form($(this)))
    {
      o_O.params(param, o_O.params_from_form($(this))[param]);
    }
  })
})
  
o_O.render_prepared_template = function(template, data, options) {
  var rendered = Mustache.to_html(template, data);
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
  
o_O.render = function(template_url, data, options, inner_element){
  o_O.get_template(template_url, data, function(data, template){ 
    if(typeof options === 'object' && !options.force_model_render)
    {
      o_O.render_prepared_template(template, data, options);
    } else if ((options && options.force_model_render) || typeof options === 'string') {
      if (options.force_model_render) {
        options = options.element
      }
      var callback
      if (data.bucket) {
        callback = function(e, operation, added, bucket) {
          $(options).html('')
          bucket.each(function(model) {
            var current_element = $(inner_element)
            $(options).append(current_element)
            o_O.render(template_url, model, {element: current_element, force_model_render: true});
          })
        }
      } else {
        callback = function() {
          o_O.render_prepared_template(template, data.to_model_hash(), {html: options});
        }
      }
      data.data_changed(callback)
      callback(null, null, null, data)
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

o_O.bind_form = function(object, model_class, element_selector) {
  
}