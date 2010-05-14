Review = function(){
  validates_presence_of('title');
  validates_presence_of('content');
};
Review.prototype = Binder();