eyeballs.dom_adapter = {
  initialize_collections: function(name){
    jQuery(document).ready(function(){
      $('[data-collection=' + name + ']').each(function(index, item){
        $(item).html(eyeballs.initialize(name).empty_collection())
      })
    })
  }
}