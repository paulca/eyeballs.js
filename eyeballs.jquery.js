eyeballs.hooks.add({
  after_initialize: function(name){
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
  after_create: function(model){
    jQuery(document).ready(function(){
      jQuery(model.collection_selector()).each(function(index, item){
        var context;
        
        if(jQuery(item).data('context') !== void(0))
        {
          context = jQuery(item).data('context')
        }
        else
        {
          context = 'default';
        }
        jQuery(item).find('[data-empty=true]').remove().end()
                    .append(model.to_html(context))
      })
    })
  },
  after_destroy: function(model){
    jQuery(document).ready(function(){
      jQuery(model.instance_selector()).each(function(index, item){
        jQuery(item).remove();
      })
      eyeballs.hooks.after_initialize(model.model_name())
    })
  },
  after_update: function(model){
    jQuery(document).ready(function(){
      jQuery(model.instance_selector()).each(function(index, item){
        if(jQuery(item).parents('[data-collection]:first').data('context') !== void(0))
        {
          context = jQuery(item).parents('[data-collection]:first')
                                .data('context')
        }
        else
        {
          context = 'default';
        }
        
        jQuery(item).replaceWith(model.to_html(context))
      })
    })
  }
})