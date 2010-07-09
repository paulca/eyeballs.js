o_O.routes = {
  
  rules: {},
  urls: [],
  
  figure_action: function(options){
    var parts = options.to.split('#');
    var controller = parts[0];
    var action = parts[1];

    controller = controller.capitalize() + "Controller";
    return window[controller][action];
  },
  
  router: function(prefix){
    return {
      root: function(options){
        o_O.routes.rules['root'] = {"action": o_O.routes.figure_action(options)}
      },
      namespace: function(prefix, callback){
        callback(o_O.routes.router(prefix));
      },
      match: function(route, options){
        var parsed_route = route.o_O_trim('/')
        if(typeof prefix != 'undefined')
        {
          parsed_route = prefix + '/' + parsed_route
        }
        o_O.routes.rules[parsed_route] = {
          action: o_O.routes.figure_action(options),
          with_args: options.with_args
          };
        o_O.routes.urls.push(parsed_route);
      }
    }
  },
  
  draw: function(callback){    
    $(function(){
      
      callback(o_O.routes.router());
      if(location.hash.o_O_trim() == '')
      {
        if(typeof o_O.routes.rules['root'] === 'object')
        {
          o_O.routes.rules['root'].action();
        }
      }
      
      $(window).bind( 'hashchange', function(){
        var hash = location.hash.replace(/^(#)/, '').o_O_trim('/');
        if(o_O.routes.urls.indexOf(hash) >= 0)
        {
          o_O.routes.rules[hash].action(o_O.routes.rules[hash].with_args);
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