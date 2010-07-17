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
          var message = field.capitalize() + ' should be less than ' + max + ' characters';
          object.errors.push({field: field, type: 'length', message: message});
        }
        if(min && object[field].length < min)
        {
          var message = field.capitalize() + ' should be greater than ' + min + ' characters';
          object.errors.push({field: field, type: 'length', message: message});
        }
      }
    }
  },
  run_presence_validations: function(object){
    for(var i = 0; i < object.validations.presence.length; i++)
    {
      var field = object.validations.presence[i].field;
      if(object[field] == null || (typeof object[field] === 'string' && object[field].blank()) )
      {
        var message = field.capitalize() + ' should be present';
        object.errors.push({field: field, type: 'presence', message: message})
      }
    }
  }
}