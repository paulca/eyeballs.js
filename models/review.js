var Review = o_O(function(review){
  review.validates_presence_of('title');
  review.validates_presence_of('content');
  review.validates_length_of('title', {min: 10})
})