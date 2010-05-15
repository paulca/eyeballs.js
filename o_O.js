var o_O = function(attributes){
  var that = {
    validates_presence_of: function(field){
      this.validations.presence.push(field)
    },
    save: function(){
      for(i = 0; i < this.validations.presence.length; i++)
      {
        var field = this.validations.presence[i];
        if(this[field] == '' || this[field] == null)
        {
         this.errors.push(field + " should be present")
        }
      }
      
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
    validations: {presence:[]}
  };

  for ( var attribute in attributes ) {
    that[attribute] = attributes[attribute];
  }
  
  return that;
  
  // var initializer = {
  //   validates_presence_of: function(field){
  //     validations.push({field: field, type: 'presence'})
  //   }
  // }
  // 
  // callback(initializer);
  // 
  // return function(){
  //   var validations;
  //   var attributes = arguments[0] || {};
  //   attributes.errors = []
  //   attributes.save = function(){
  //     return true;
  //   }
  //   return attributes;
  // };
  // var validations;
  // validations = {presence:[]};
  // 
  // validates_presence_of = function(field){
  //   if($.inArray(field,validations.presence) === -1)
  //   {
  //     validations.presence.push(field);
  //   }
  // }
  // 
  // return {
  //   hello: function(){ return that },
  //   attributes: attributes,
  //   errors: [],
  //   save: function(){
  //     for(i = 0; i < validations.presence.length; i++)
  //     {
  //       var field = validations.presence[i];
  //       if(this[field] == '' || this[field] == null)
  //       {
  //        this.errors.push(field + " should be present")
  //       }
  //     }
  //     
  //     if(this.errors.length == 0)
  //     {
  //       return true;
  //     }
  //     else
  //     {
  //       return false;
  //     }
  //   }
  // }
}