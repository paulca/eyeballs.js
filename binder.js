Binder = function(){
  var validations;
  validations = {presence:[]};
  
  validates_presence_of = function(field){
    if($.inArray(field,validations.presence) === -1)
    {
      validations.presence.push(field);
    }
  }
  
  return {
    hello: function(){ return that },
    attributes: {},
    errors: [],
    save: function(){
      for(i = 0; i < validations.presence.length; i++)
      {
        var field = validations.presence[i];
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
    }
  }
}