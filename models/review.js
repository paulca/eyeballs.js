Model.review = function(attributes){
  var that = o_O(attributes);
  that.validates_presence_of('title');
  that.validates_presence_of('content');
  return that;
}