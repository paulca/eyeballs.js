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
          var element = $(this)
          $(this).bind(action_event(element), controller[element.attr('data-action')]);
          if(!($(this).attr('data-default')))
          {
            $(this).bind(action_event(element), function(){ return false; });
          }
        })
      }
    })
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
      return field.val();
    });
  }