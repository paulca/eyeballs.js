eyeballs.dom_adapter = {
  initialize_collections: function(name){
    jQuery(document).ready(function(){
      var selector;
      jQuery('[data-collection=' + name + ']').each(function(index, item){
        if(jQuery(item).find('[data-model=' + name + ']').length == 0 &&
             jQuery(item).find('[data-empty=true').length == 0)
        {
          jQuery(item).html(eyeballs.initialize(name).empty_collection())
        }
      })
    })
  },
  add_to_collection: function(model){
    jQuery(document).ready(function(){
      jQuery(model.collection_selector()).each(function(index, item){
        jQuery(item).find('[data-empty=true]').remove().end()
                    .html(model.to_html())
      })
    })
  },
  destroy: function(model){
    jQuery(document).ready(function(){
      jQuery(model.instance_selector()).each(function(index, item){
        jQuery(item).remove();
      })
      eyeballs.dom_adapter.initialize_collections(model.model_name())
    })
  },
  update: function(model){
    jQuery(document).ready(function(){
      jQuery(model.instance_selector()).each(function(index, item){
        jQuery(item).replaceWith(model.to_html())
      })
    })
  }
}