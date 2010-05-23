o_O('ReviewsController', {
  index: function(){
    @reviews = Review.all();
    o_O.render();
  },
  create: function(){
    var review = Review.initialize(o_O.params($(this)));
    var form = $(this);
    if(review.valid())
    {
      review.save(function(review){
        o_O.get_template('reviews/_review', review, function(data, template){ 
          new_review = Mustache.to_html(template, data);
          $('div#reviews').prepend(new_review);
        });
        form.find('input[type=text], textarea').val('');
      });
    }
    else
    {
      o_O.alert_errors(review);
    }
  },
  edit: function(){
    review_div = $(this).parents('div.review');
    review = Review.find(review_div.attr('data-id'), function(review){
      o_O.get_template('reviews/edit', review, function(data, template){
        edit_review = Mustache.to_html(template, data);
        review_div.hide().after(edit_review);
      });
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
    var form = $(this)
    Review.find(form.attr('data-id'), function(review){
      if(review.valid())
      {
        review.update_attributes(o_O.params(form), function(updated_review){
          o_O.get_template('reviews/_review', updated_review, function(data, template){ 
            var template = Mustache.to_html(template, data);
            edit_review_div.replaceWith(template);
            review_div.remove();
          });
        })
      }
      else
      {
         o_O.alert_errors(review);
      }
    });
  },
  destroy: function(){
    if(confirm('Are You sure?'))
    {
      $(this).parents('div.review:first').slideToggle(function(){
        var div = $(this);
        Review.find($(this).attr('data-id'), function(review){
          review.destroy();
          div.remove();
        });
      });
    }
  },
  boopty: function(){
    alert('BOOPTY!');
  }
});