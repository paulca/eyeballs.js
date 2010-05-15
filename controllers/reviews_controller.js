$(function(){
  $('form[data-model=review]').submit(function(){
    try{
      myReview = Model.review();
      myReview.title = $("#review-title").val();
      myReview.content = $('#review-content').val();
      if(myReview.save())
      {
        console.log('ok!')
      }
      else
      {
        console.log(myReview.errors)
      }
    }
    catch(e){
      console.log(e)
    }
    return false;
  });
})