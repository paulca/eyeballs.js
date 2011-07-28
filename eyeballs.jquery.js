eyeballs.dom_adapter = {
  initialize_collections: function(name){
    jQuery(document).ready(function(){
      jQuery('[data-collection=' + name + ']').each(function(index, item){
        jQuery(item).html(eyeballs.initialize(name).empty_collection())
      })
    })
  },
  add_to_collection: function(model){
    jQuery(document).ready(function(){
      jQuery(model.collection_selector()).each(function(index, item){
        jQuery(item).find('[data-empty=true]').remove().end()
                    .append(model.to_html())
      })
    })
  }
}