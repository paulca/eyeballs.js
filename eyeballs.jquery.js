eyeballs.hooks.add({
  after_initialize: function(model){
    name = model.model_name;
    jQuery(document).ready(function(){
      var selector;
      jQuery(model.collection_selector()).each(function(index, item){
        if(jQuery(item).find(model.model_selector()).length === 0 &&
             jQuery(item).find(model.empty_selector()).length === 0)
        {
          jQuery(item).html(eyeballs.initialize(name).empty_collection())
        }
        else if(jQuery(item).find(model.empty_selector()).length === 1)
        {
          o_O(name).all(function(item){
            eyeballs.hooks.after_create(item);
          })
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
        jQuery(item).find(model.empty_selector()).remove().end()
                    .append(model.to_html(context))
      })
    })
  },
  after_destroy: function(model){
    jQuery(document).ready(function(){
      jQuery(model.instance_selector()).each(function(index, item){
        jQuery(item).remove();
      })
      eyeballs.initialize(model.model_name()).initialize()
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