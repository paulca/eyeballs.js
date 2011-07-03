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
  var render_arguments = arguments
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
          $(options).find('[data-bind]').each(function() {
            var self = $(this)
            if (!self.data('bound_model')) {
              self.change(function() {
                if (self.is('[type=checkbox]')) {
                  data(self.attr('name'), self.attr('checked'))
                } else {
                  data(self.attr('name'), self.val())
                }
              })
              self.data('bound_model', data)
            }
          })
        }
      }
      data.data_changed(callback)
      callback(null, null, null, data)
    }
    
    if (typeof render_arguments[render_arguments.length - 1] == 'function') {
      render_arguments[render_arguments.length - 1]()
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

o_O.bind_form = function() {
  if (arguments.length > 2) {
    var bucket = arguments[0]
    var model_class = arguments[1]
    var selector = arguments[2]
    var form = $(selector)
    
    var temp_model = model_class.initialize({})
    o_O.bind_form(temp_model, selector)
    temp_model.event_handler.bind('cloneFromForm', function(e, model) {
      bucket.add(model_class.initialize(model.raw_attributes))
      model.clear()
    })
  } else {
    var model = arguments[0]
    var form  = $(arguments[1])
    form.find(':input').each(function() {
      var field = $(this)
      var modelValue = model(field.attr('name'))
      if (modelValue) {
        field.val(modelValue)
      }
    })
    
    form.submit(function(e) {
      e.preventDefault()
      e.stopPropagation()

      var self = $(this)
      var fields = self.find(':input')
      fields.each(function() {
        var field = $(this)
        model(field.attr('name'), field.val())
      })
      model.event_handler.triggerHandler('cloneFromForm', [model]);
    })
    
    model.data_changed(function(e, attribute, value, self) {
      form.find(':input[name="' + attribute + '"]').val(value);
    })
  }
}