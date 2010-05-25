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

o_O.model = {
  adapter: o_O.dom,
  initialize: function(model_name, callback){
    var callback = callback;
    var class_methods, instance_methods, initializer_methods;
    var validates_presence_of, validates_length_of;
    var table_name = model_name.toLowerCase() + 's';
  
    class_methods = {
      validations: {presence: [], lengthliness: [], custom: []},
      methods: {},
      validates_presence_of: function(field){
        this.validations.presence.push({field: field});
      },
      validates_length_of: function(field, options){
        options.field = field;
        this.validations.lengthliness.push(options);
      },
      validates: function(validation){
        this.validations.custom.push(validation)
      }
    }
  
    var config = callback(class_methods);
  
    instance_methods = {
      adapter: o_O.model.adapter,
      destroy: function(callback){
        if(this.adapter)
        {
          this.adapter.destroy(this, callback);
        }
        return this;
      },
      model_name: model_name,
      save: function(callback){
        if(this.valid())
        {
          if(this.adapter)
          {
            var model = this;
            this.adapter.save(this, function(returned_object){
              if(typeof callback === 'function')
              {
                callback(o_O.models[model.model_name].initialize(returned_object))
              }
            });
          }
          return this;
        }
      },
      table_name: table_name,
      to_json: function(){
        var serialized_object = {};
        for(var i = 0; i < this.attributes.length; i++);
        {
          var index = i - 1;
          var attribute_name = this.attributes[index];
          serialized_object[this.attributes[index]] = this[this.attributes[index]];
        }
        serialized_object._model_name = this.model_name;
        return JSON.stringify(serialized_object);
      },
      update_attributes: function(attributes, callback){
        for(var attribute in attributes)
        {
          this[attribute] = attributes[attribute];
        }
        this.save(callback);
      },
      valid: function(){
        this.errors = [];
        
        o_O.validations.run(this);

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
    for(method in class_methods.methods)
    {
      instance_methods[method] = class_methods.methods[method]
    }
  
    initializer_methods = {
      adapter: o_O.model.adapter,
      all: function(callback){
        if(this.adapter)
        {
          return this.adapter.all(this, callback);
        }
      },
      initialize: function(attributes){
        if(!attributes) { var attributes = {}; };
        var initialized_attributes = [];
        for( var attribute in attributes )
        {
          initialized_attributes.push(attribute);
        }
        attributes['attributes'] = initialized_attributes;
        for ( var method in instance_methods ) {
          attributes[method] = instance_methods[method];
        }
        if(!attributes['id'])
        {
          attributes['id'] = o_O.uuid();
        }
        return attributes;
      },
      find: function(id, callback){
        if(this.adapter)
        {
          var model = this;
          this.adapter.find(this, id, function(returned_object){
            if(typeof callback === 'function')
            {
              callback(model.initialize(returned_object));
            }
          });
        }
      },
      model_name: model_name,
      table_name: table_name
    }
  
    return initializer_methods;
  }
}

o_O.validations = {
  run: function(object){
    this.run_custom_validations(object);
    this.run_length_validations(object);
    this.run_presence_validations(object);
  },
  run_custom_validations: function(object){
    for(var i = 0; i < object.validations.custom.length; i++)
    {
      object.validations.custom[i](object);
    }
  },
  run_length_validations: function(object){
    for(var i = 0; i < object.validations.lengthliness.length; i++)
    {
      var field = object.validations.lengthliness[i].field;
      var max = object.validations.lengthliness[i].max
      var min = object.validations.lengthliness[i].min
      if(object[field])
      {
        if(max && object[field].length > max)
        {
          var message = field + ' should be less than ' + max + ' characters';
          object.errors.push({field: field, type: 'length', message: message});
        }
        if(min && object[field].length < min)
        {
          var message = field + ' should be greater than ' + min + ' characters';
          object.errors.push({field: field, type: 'length', message: message});
        }
      }
    }
  },
  run_presence_validations: function(object){
    for(var i = 0; i < object.validations.presence.length; i++)
    {
      var field = object.validations.presence[i].field;
      if(object[field] == '' || object[field] == null)
      {
        var message = field + ' should be present';
        object.errors.push({field: field, type: 'presence', message: message})
      }
    }
  }
}

o_O.config = {}
o_O.templates = {}

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