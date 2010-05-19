o_O('ReviewsController', {
  create: function(){
    review = Review.initialize(o_O.form.attributes($(this)));
    if(review.save())
    {
      o_O.get_template('reviews/_review', function(template){ 
        new_review = Mustache.to_html(template, review);
        $('div#reviews').append(new_review);
      });
      $(this).find('input[type=text], textarea').val('');
    }
    else
    {
      var error_message = '';
      for(i = 0; i < review.errors.length; i++)
      {
        error_message = error_message + review.errors[i].message + "\n";
      }
      alert(error_message);
    }
  },
  edit: function(){
    review_div = $(this).parents('div.review');
    review = Review.find(review_div.attr('data-id'));
    o_O.get_template('reviews/edit', function(template){
      edit_review = Mustache.to_html(template, review);
      review_div.replaceWith(edit_review);
    });
  },
  update: function(){
    edit_review_div = $(this).parents('div.edit-review');
    review = Review.find($(this).attr('data-id'));
    if(review.update_attributes(o_O.form.attributes($(this))))
    {
      o_O.get_template('reviews/_review', function(template){ 
              updated_review = Mustache.to_html(template, review);
              edit_review_div.replaceWith(updated_review);
            }); 
    }
    else
    {
      console.log(review.errors);
    }
  },
  destroy: function(){
    if(confirm('Are You sure?'))
    {
      $(this).parents('div.review:first').slideToggle(function(){
        $(this).remove();
      });
    }
  }
});