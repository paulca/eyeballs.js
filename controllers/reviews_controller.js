var ReviewsController = {
  create: function(){
    review = Review.initialize(o_O.form.attributes($(this)));
    if(review.save())
    {
      o_O.get_template('reviews/_review', function(template){ 
        new_review = Mustache.to_html(template, review);
        $('div#reviews').append(new_review);
      });
    }
    else
    {
      console.log(review.errors);
    }
    $(this).find('input[type=text], textarea').val('');
  },
  edit: function(){
    
  },
  destroy: function(){
    if(confirm('Are You sure?'))
    {
      $(this).parents('div.review:first').remove();
    }
  }
}

$('form[data-action=reviews-create]').live('submit', ReviewsController.create);
$('form[data-action=reviews-create]').live('submit', function(){ return false });

$('a[data-action=reviews-destroy]').live('click', ReviewsController.destroy);
$('a[data-action=reviews-destroy]').live('click', function(){ return false });