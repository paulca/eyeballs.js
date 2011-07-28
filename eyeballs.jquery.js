eyeballs.dom_adapter = {
  initialize_collections: function(name){
    jQuery(document).ready(function(){
      jQuery('[data-collection=' + name + ']').each(function(index, item){
        jQuery(item).html(eyeballs.initialize(name).empty_collection())
      })
    })
  }
}