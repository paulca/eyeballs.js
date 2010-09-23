var o_O = function(){

  var bind_to;
  var object_to_bind_to = arguments[2];
  
  bind_to = (object_to_bind_to) ? object_to_bind_to : o_O.config.default_bind_to();

  if(typeof arguments[1] === 'object')
  {
    var controller_name = arguments[0];
    bind_to[controller_name] = o_O.controller.initialize(controller_name, arguments[1]);
    return bind_to[controller_name];
  }
  else
  {
    var model_name = arguments[0];
    var model_initializer = arguments[1];
    
    if(typeof model_initializer != 'function')
    {
      model_initializer = function(){}
    }
    
    bind_to[model_name] = o_O.model.initialize(model_name, model_initializer);
    
    if(typeof o_O.models !== 'object')
    {
      o_O.models = {};
    }
    o_O.models[model_name] = bind_to[model_name];
    
    return bind_to[model_name];
  }
}

o_O.config = {
  default_bind_to: function(){
    return (o_O.config.bind_to) ? o_O.config.bind_to : window
  }
}
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