// This is a very handy place to put any initial logic
// For example, choosing your adapter
<% if rack_app? %>
o_O.model.adapter = o_O.rest;
o_O.config.authenticity_token = $('meta[name=csrf-token]').attr('content')
<% else %>
o_O.model.adapter = o_O.localstorage;
<% end %>