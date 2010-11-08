var current_test = document.location.pathname.split('/')[document.location.pathname.split('/').length - 1];
var index = test_files.indexOf(current_test)

if(index > -1 && document.location.hash === '#run_all')
{
  setInterval(next_test_if_complete, 20)
}

function next_test_if_complete(){
  if($('li.pass').length > 0 && $('li.fail').length === 0 && $('p#qunit-testresult'))
  {
    if(test_files[index+1])
    {
      document.location.href = test_files[index+1] + '#run_all'
    }
  }
}