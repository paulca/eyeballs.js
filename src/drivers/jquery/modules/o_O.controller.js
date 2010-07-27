o_O.controller = {
  initialize: function(controller_name, controller){

    var controller_name = controller_name.replace('Controller', '').toLowerCase();
    var controller = controller;

    $(function(){
      var events = 'click submit hover mouseover blur focus change dblclick keydown keypress keyup scroll'
      $('body').delegate('[data-bind]', events, function(event){
        var binders = $(this).attr('data-bind').match(/[\+]?(\s+)?[^ :]?[: ]?[^ #]+[ #]+[^ ;]+[ ;]?/g);
        if(binders != null && binders.length > 0)
        {
          for(i = 0; i < binders.length; i++)
          {
            var rule = binders[i];
            var parts = rule.match(/([\+])?(\s+)?(([^ :]+)([: ]+))?([^ #]+)[ #]+([^ ;]+)[ ;]?/);
            var default_bit = parts[1];
            var this_action_event = parts[4];
            if(this_action_event === undefined)
            {
              this_action_event = ($(this).is('form')) ? 'submit' : 'click';
            }
            if(this_action_event === 'blur' && event.type == 'focusout')
            {
              this_action_event = 'focusout';
            }
            if(this_action_event === 'focus' && event.type == 'focusin')
            {
              this_action_event = 'focusin';
            }
            var this_controller_name = parts[6];
            var this_action = parts[7];
            if(this_controller_name == controller_name && this_action_event === event.type)
            {
              if(default_bit != '+')
              {
                controller[this_action].apply(this);
                return false;
              }
              else
              {
                return controller[this_action].apply(this);
              }
            }
          }
        }
      })
    });
    return controller;
  }
}