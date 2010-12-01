// This is a very handy place to put any initial logic
// For example, choosing your adapter
<% if rack_app? %>
o_O.model.adapter = o_O.rest;
o_O.config.authenticity_token = $('meta[name=csrf-token]').attr('content')
o_O.config.template_path = '/javascripts/app/views';
o_O.config.include_json_root = true;

jQuery.ajaxSetup({ 
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept",
    "text/javascript")} 
})
<% else %>
o_O.model.adapter = o_O.localstorage;
<% end %>