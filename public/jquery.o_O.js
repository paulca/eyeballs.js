o_O.controller = {
  initialize: function(controller_name, controller){
    var action_event = function(object){
      if(object.attr('data-event'))
      {
        return object.attr('data-event');
      }
      return (object.is('form')) ? 'submit' : 'click';
    }

    var controller_name = controller_name.replace('Controller', '').toLowerCase();
    var controller = controller;

    $(function(){
      for(var action in controller)
      {        
        var selector = '[data-controller=' + controller_name + '][data-action=' + action + ']';
        $(selector).livequery(function(){
          var element = $(this);
          $(this).bind(action_event(element), controller[element.attr('data-action')]);
          if(!($(this).attr('data-default')))
          {
            $(this).bind(action_event(element), function(){ return false; });
          }
        })
      }
      $('[data-bind]').livequery(function(){
        var binders = $(this).attr('data-bind').match(/[\+]?(\s+)?[^ :]?[: ]?[^ \/]+[ \/]+[^ ;]+[ ;]?/g)
        if(binders != null && binders.length > 0)
        {
          for(i = 0; i < binders.length; i++)
          {
            var rule = binders[i];
            var parts = rule.match(/([\+])?(\s+)?(([^ :]+)([: ]+))?([^ \/]+)[ \/]+([^ ;]+)[ ;]?/)
            var default_bit = parts[1];
            var this_action_event = parts[4];
            if(this_action_event === undefined)
            {
              this_action_event = ($(this).is('form')) ? 'submit' : 'click';
            }
            var this_controller_name = parts[6];
            var this_action = parts[7];
            if(this_controller_name == controller_name)
            {
              $(this).bind(this_action_event,controller[this_action]);
              if(default_bit != '+')
              {
                $(this).bind(this_action_event, function(){ return false; });
              }
            }
          }
        }
      });
    });
    return controller;
  }
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
      url = 'views/'
    }
    $.get(url + template + '.html.mustache', function(response){
      o_O.templates[template] = response;
      callback(data, response);
    });
  }
}