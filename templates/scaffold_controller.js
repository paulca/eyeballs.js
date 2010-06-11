o_O('<%= name.capitalize.pluralize -%>Controller', {
  index: function(){
    <%= name.capitalize %>.all(function(<%= name.downcase.pluralize %>){
      for(var id in <%= name.downcase.pluralize %>)
      {
        var <%= name.downcase %> = <%= name.downcase.pluralize %>[id];
        o_O.render('<%= name.downcase.pluralize %>/_<%= name.downcase %>', <%= name.downcase %>, {append: 'div#<%= name.downcase.pluralize %>'})
      }
    });
  },
  create: function(){
    var <%= name.downcase %> = <%= name.capitalize %>.initialize(o_O.params($(this)));
    var form = $(this);
    <%= name.downcase %>.save({
      invalid: function(<%= name.downcase %>){
        o_O.alert_errors(<%= name.downcase %>);
      },
      success: function(<%= name.downcase %>){
        o_O.render('<%= name.downcase.pluralize %>/_<%= name.downcase %>', <%= name.downcase %>, {prepend: 'div#<%= name.downcase.pluralize %>'});
        form.find('input[type=text], textarea').val('');
      }
    })
  },
  edit: function(){
    <%= name.downcase %>_div = $(this).parents('div.<%= name.downcase %>');
    review = <%= name.capitalize %>.find(<%= name.downcase %>_div.attr('data-id'), function(<%= name.downcase %>){
      o_O.get_template('<%= name.downcase.pluralize %>/edit', <%= name.downcase %>, function(data, template){
        edit_<%= name.downcase %> = Mustache.to_html(template, data);
        <%= name.downcase %>_div.hide().after(edit_<%= name.downcase %>);
      });
    });
  },
  cancel_edit: function(){
    edit_<%= name.downcase %>_div = $(this).parents('div.edit-<%= name.downcase %>');
    <%= name.downcase %>_div = edit_<%= name.downcase %>_div.prev('div.<%= name.downcase %>:first');
    edit_<%= name.downcase %>_div.remove();
    <%= name.downcase %>_div.show();
  },
  update: function(){
    edit_<%= name.downcase %>_div = $(this).parents('div.edit-<%= name.downcase %>');
    review_div = edit_<%= name.downcase %>_div.prev('div.<%= name.downcase %>:first');
    var form = $(this)
    <%= name.capitalize %>.find(form.attr('data-id'), function(<%= name.capitalize %>){
      if(<%= name.capitalize %>.valid())
      {
        <%= name.capitalize %>.update_attributes(o_O.params(form), function(updated_<%= name.downcase %>){
          o_O.get_template('<%= name.downcase.pluralize %>/_<%= name.downcase %>', updated_<%= name.downcase %>, function(data, template){ 
            var template = Mustache.to_html(template, data);
            edit_<%= name.downcase %>_div.replaceWith(template);
            <%= name.downcase %>_div.remove();
          });
        });
      }
      else
      {
         o_O.alert_errors(<%= name.downcase %>);
      }
    });
  },
  destroy: function(){
    if(confirm('Are You sure?'))
    {
      $(this).parents('div.<%= name.downcase %>:first').slideToggle(function(){
        var div = $(this);
        <%= name.capitalize %>.find($(this).attr('data-id'), function(<%= name.downcase %>){
          <%= name.downcase %>.destroy();
          div.remove();
        });
      });
    }
  },
});