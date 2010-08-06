o_O.routes = {
  
  rules: {},
  urls: [],
  regex_urls: [],
  
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

        if(parsed_route.indexOf(':') >= 0)
        { 
          var regex_to_match = parsed_route.replace(/:[^\/]*/g, '([^\/]*)');
          o_O.routes.rules[parsed_route] = {
            action: o_O.routes.figure_action(options),
            matchers: parsed_route.match(/:[^\/]*/g)
            };
          o_O.routes.regex_urls.push({regex: regex_to_match, matcher:parsed_route});
        }
        else
        {
          o_O.routes.rules[parsed_route] = {
            action: o_O.routes.figure_action(options),
            with_args: options.with_args
            };
          o_O.routes.urls.push(parsed_route);
        }
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
      
      var route_on_hash = function(){
        var hash = location.hash.replace(/^(#)/, '').o_O_trim('/');
        if(o_O.routes.urls.indexOf(hash) >= 0)
        {
          o_O.routes.rules[hash].action(o_O.routes.rules[hash].with_args);
        }
        else
        {
          for(i = 0; i < o_O.routes.regex_urls.length; i++)
          {
            if(match = hash.match(o_O.routes.regex_urls[i].regex))
            {
              var rule = o_O.routes.rules[o_O.routes.regex_urls[i].matcher];
              rule.action(function(attr){
                var params = {}
                for(j = 0; j < rule.matchers.length; j++)
                {
                  params[rule.matchers[j].replace(/^:/, '')] = match[j+1];
                }
                if(attr)
                {
                  return params[attr];
                }
                else
                {
                  return params;
                }
              });
            }
          }
        }
      }
      
      $(window).bind( 'hashchange', route_on_hash);
      
      $('a').live('click', function(){
        if($(this).is('a[data-ajax-history=true]'))
        {
          document.location.hash = $(this).attr('href')
          return false;
        }
      });
      
      if(location.hash != '')
      {
        route_on_hash();
      }
    }) 
  }
}