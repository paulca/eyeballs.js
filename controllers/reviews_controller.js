var ReviewsController = {
  create: function(){
    review = Review.initialize(o_O.form.attributes($(this)));
    if(review.save())
    {
      $.get('views/reviews/_review.html.mustache', function(template){ 
        new_review = Mustache.to_html(template, review);
        $('div#reviews').append(new_review);
      });
    }
    else
    {
      console.log(review.errors);
    }
  }
}

$('form[data-action=reviews-create]').submit(ReviewsController.create);
$('form[data-action=reviews-create]').submit(function(){ return false });