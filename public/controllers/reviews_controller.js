o_O('ReviewsController', {
  index: function(){
    reviews = Review.all();
    for(var id in reviews)
    {
      var review = reviews[id];
      o_O.get_template('reviews/_review', review, function(data, template){ 
        new_review = Mustache.to_html(template, data);
        $('div#reviews').append(new_review);
      });
    }
  },
  create: function(){
    review = Review.initialize(o_O.params($(this)));
    if(review.valid())
    {
      review.save();
      o_O.get_template('reviews/_review', review, function(data, template){ 
        new_review = Mustache.to_html(template, data);
        $('div#reviews').append(new_review);
      });
      $(this).find('input[type=text], textarea').val('');
    }
    else
    {
      o_O.alert_errors(review);
    }
  },
  edit: function(){
    review_div = $(this).parents('div.review');
    review = Review.find(review_div.attr('data-id'));
    o_O.get_template('reviews/edit', review, function(data, template){
      edit_review = Mustache.to_html(template, data);
      review_div.hide().after(edit_review);
    });
  },
  cancel_edit: function(){
    edit_review_div = $(this).parents('div.edit-review');
    review_div = edit_review_div.prev('div.review:first');
    edit_review_div.remove();
    review_div.show();
  },
  update: function(){
    edit_review_div = $(this).parents('div.edit-review');
    review_div = edit_review_div.prev('div.review:first');
    review = Review.find($(this).attr('data-id'));
    if(review.update_attributes(o_O.params($(this))).valid())
    {
      o_O.get_template('reviews/_review', review, function(data, template){ 
        updated_review = Mustache.to_html(template, data);
        edit_review_div.replaceWith(updated_review);
        review_div.remove();
      }); 
    }
    else
    {
      o_O.alert_errors(review);
    }
  },
  destroy: function(){
    if(confirm('Are You sure?'))
    {
      $(this).parents('div.review:first').slideToggle(function(){
        review = Review.find($(this).attr('data-id'));
        review.destroy();
        $(this).remove();
      });
    }
  },
  boopty: function(){
    alert('BOOPTY!');
  }
});