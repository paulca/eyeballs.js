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
      console.log('ah! ah! ah!');
    }
  },
  destroy: function(){
    if(confirm('Are You sure?'))
    {
      $(this).parents('div.review:first').remove();
    }
  }
}

$('form[data-action=reviews-create]').live('submit',ReviewsController.create);
$('form[data-action=reviews-create]').live('submit', function(){ return false });

$('a[data-action=reviews-destroy]').live('click',ReviewsController.destroy);
$('a[data-action=reviews-destroy]').live('click', function(){ return false });