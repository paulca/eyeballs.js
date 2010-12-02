o_O.relations = {
  class_methods: {
    relations: {},
    has_many: function(name){ 
      this.relations[name] = new o_O.HasManyRelation(name);
    },
  }
}

o_O.HasManyRelation = function(name) {
  this.name = name;
  this.all = function(callback) {
    try {
      callback([]);
    } 
    catch (e) 
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
}
