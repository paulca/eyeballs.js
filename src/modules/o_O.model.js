o_O.model = {
  adapter: false,
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
  
    var run_callback = function(callback, method, args){
      try{
        if(typeof callback === 'function' && method === 'success')
        {
          callback(args);
        }
        if(typeof callback === 'object' && typeof callback[method] === 'function')
        {
          callback[method](args);
        }
      }
      catch(e)
      {
        if(typeof console === 'object')
        {
          console.log(e);
        }
        else
        {
          alert(e);
        }
      }
    }  

    var config = callback(class_methods);
    instance_methods = {
      adapter: o_O.model.adapter,
      destroy: function(callback){
        run_callback(callback, 'loading', this)
        if(this.adapter)
        {
          this.adapter.destroy(this, function(returned_object){
            run_callback(callback, 'success', returned_object);
          });
        }
        else
        {
          run_callback(callback, 'success', this)
        }
        return this;
      },
      model_name: model_name,
      save: function(callback){
        if(this.valid())
        {
          run_callback(callback, 'loading', this);
          if(this.adapter)
          {
            var model = this;
            this.adapter.save(this, function(returned_object){
              var initialized_object = o_O.models[model.model_name].initialize(returned_object);
              initialized_object.new_record = false;
              run_callback(callback, 'success', initialized_object);
            }, callback);
          }
          else
          {
            run_callback(callback, 'success', this);
          }
          return this;
        }
        else
        {
          run_callback(callback, 'invalid', this);
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
        if(!attributes['new_record'])
        {
          attributes['new_record'] = true;
        }
        return attributes;
      },
      find: function(id, callback){
        if(this.adapter)
        {
          run_callback(callback, 'loading', this)
          var model = this;
          return this.adapter.find(this, id, function(returned_object){
            found_object = model.initialize(returned_object);
            if(!found_object['new_record'])
            {
              found_object['new_record'] = false;
            }
            if(found_object.id)
            {
              run_callback(callback, 'success', found_object);
            }
            else
            {
              run_callback(callback, 'failure', found_object);
            }
          }, callback);
        }
      },
      model_name: model_name,
      table_name: table_name
    }
  
    return initializer_methods;
  }
}