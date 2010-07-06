var o_O = function(){

  var bind_to;
  var object_to_bind_to = arguments[2];
  bind_to = (object_to_bind_to) ? object_to_bind_to : window;

  if(typeof arguments[1] === 'object')
  {
    var controller_name = arguments[0];
    bind_to[controller_name] = o_O.controller.initialize(controller_name, arguments[1]);
    return bind_to[controller_name];
  }

  if(typeof arguments[1] === 'function')
  {
    
    var model_name = arguments[0];
    var model_initializer = arguments[1];
    bind_to[model_name] = o_O.model.initialize(model_name, model_initializer);
    
    if(typeof o_O.models !== 'object')
    {
      o_O.models = {};
    }
    o_O.models[model_name] = bind_to[model_name];
    
    return bind_to[model_name];
  }
}

o_O.config = {}
o_O.templates = {}

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

o_O.alert_errors = function(object){
  var error_message = '';
  for(i = 0; i < object.errors.length; i++)
  {
    error_message = error_message + object.errors[i].message + "\n";
  }
  alert(error_message);
}