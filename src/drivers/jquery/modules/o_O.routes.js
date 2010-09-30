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
      resources: function(name){
        this.match(name, {to:name + '#index'});
        this.match(name + '/new', {to:name + '#add'});
        this.match(name + '/:id/edit', {to:name + '#edit'});
        this.match(name + '/:id', {to:name + '#show'});
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
      
      var parts, hash, query_string_parts;
      
      var update_hash_parts = function(){
        parts = location.hash.split('?')
        hash = parts[0].replace(/^(#)/, '').o_O_trim('/');
        query_string_parts;
        if(typeof parts[1] === 'string')
        {
          query_string_parts = parts[1].replace('&amp;', '&').split('&');
        }
        else
        {
          query_string_parts = '';
        }
      }
      
      var compute_params = function(rule){
        return function(attr){
          var params = {}
          if(rule)
          {
            for(j = 0; j < rule.matchers.length; j++)
            {
              params[rule.matchers[j].replace(/^:/, '')] = match[j+1];
            }
          }
          
          if(query_string_parts.length > 0)
          {
            for(k = 0; k < query_string_parts.length; k++)
            {
              var param_parts = query_string_parts[k].split('=')
              params[param_parts[0]] = param_parts[1];
            }
          }
          if(attr)
          {
            return params[attr];
          }
          else
          {
            return params;
          }
        }
      }
      
      if(location.hash.o_O_trim() == '')
      {
        update_hash_parts()
        if(typeof o_O.routes.rules['root'] === 'object')
        {
          o_O.routes.rules['root'].action(compute_params());
        }
        
      }
      
      var route_on_hash = function(){
        update_hash_parts();
        if(o_O.routes.urls.indexOf(hash) >= 0)
        {
          console.log(compute_params()())
          o_O.routes.rules[hash].action(compute_params());
        }
        else
        {
          for(i = 0; i < o_O.routes.regex_urls.length; i++)
          {
            if(match = hash.match(o_O.routes.regex_urls[i].regex))
            {
              var rule = o_O.routes.rules[o_O.routes.regex_urls[i].matcher];
              rule.action(compute_params(rule));
              return;
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