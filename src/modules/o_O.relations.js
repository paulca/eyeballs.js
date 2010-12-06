o_O.relations = {
  class_methods: {
    relations: {},
    has_many: function(name, model_name){ 
      this.relations[name] = new o_O.HasManyRelation(name, model_name);
    },
  }
}

o_O.HasManyCallback = function(has_many_relation, callback) {
  var belongs_to = has_many_relation.belongs_to;
  this.url = '/' + belongs_to.table_name + '/' + belongs_to.id + '/comments';
  this.success = callback;
}

/* Constructed with the name of the relation, which is in plural, lowercase
 * form, and the model name which is singular and uppercase. */
o_O.HasManyRelation = function(name, model_name) {
  this.belongs_to = null; // set later
  this.name = name;
  this.all = function(callback) {
    try {
      var table_name = name;
      model = o_O.models[model_name];
      model.all(new o_O.HasManyCallback(this, callback));
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
