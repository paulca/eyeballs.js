o_O.routes = {
  
  rules: {},
  urls: [],
  
  router: {
    match: function(route, options){
      
      var figure_action = function(options){
        var parts = options.to.split('#');
        var controller = parts[0];
        var action = parts[1];
        
        controller = controller.capitalize() + "Controller";
        return window[controller][action];
      }
      
      o_O.routes.rules[route] = {"action": figure_action(options), "with": options.with};
      o_O.routes.urls.push(route);
    }
  },
  
  draw: function(callback){    
    $(function(){
      
      callback(o_O.routes.router);
      
      $(window).bind( 'hashchange', function(){
        var hash = location.hash.replace(/^(#)/, '');
        if(o_O.routes.urls.indexOf(hash) >= 0)
        {
          o_O.routes.rules[hash].action(o_O.routes.rules[hash].with);
        }
      });
      
      $('a').live('click', function(){
        if($(this).is('a[data-ajax-history=true]'))
        {
          document.location.hash = $(this).attr('href')
          return false;
        }
      });
    })
  }
}