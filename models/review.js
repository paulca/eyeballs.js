o_O('Review', function(review){
  review.validates_presence_of('title');
  review.validates_presence_of('content');
});