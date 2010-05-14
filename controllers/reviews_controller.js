$(function(){
  $('form[data-model=review]').submit(function(){
    review = new Review();
    review.title = $("#review-title").val();
    review.content = $('#review-content').val();
    review.save();
    return false;
  });
})