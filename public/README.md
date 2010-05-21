eyeballs.js
===========

eyeballs.js is a slim javascript library that sits on top of a javascript framework, such as jQuery, to help organise client-side web app code using the Model-View-Controller pattern.

The syntax is intended to be familiar to anyone who is comfortable with Rails, but also attempts to be idiomatic javascript.


Models
======

You define a model by passing a function to the eyeballs ( o_O ) function. As inspired by Rails, model definitions are capitalised. Note, however, that the new prefix is not used.

    var Post = o_O(function(post){ })

You can now initialize an individual post:

    var post = Post.initialize({title: 'My New Post'})
    post.title #=> 'My New Post'

Not very exciting.

However, if you're familiar with Rails, you'll be familiar with the wonderful syntax for adding validations to your models. eyeballs.js lets you add validations to your models as follows:

    var Post = o_O(function(post){
      post.validates_presence_of('title)
    })

Now, when you initialize a new Post, you can validate it, nice and easy:

    var post = Post.initialize()
    post.valid()  # => false
    post.errors   # => [{
                  #     field: 'title',
                  #     message: 'title should be present',
                  #     type: 'presence'}]

and so on, so forth. This will be very familiar to those who use Rails.

You can also add your own validations, again, similar to how Rails does things:

    var Post = o_O(function(post){
      post.validates(function(post){
        if(post.title != 'Awesome')
        {
          post.errors.push({message: 'Not Awesome Enough'})
        }
      })
    })
    
    var post = Post.initialize()
    post.save()     # yep, there's a save method too!
    post.errors   # => [{
                  #     message: 'title should be present'}]

And if you want to add your own methods:

    var Post = o_O(function(post){
      post.methods.title_downcased: function(){
        this.title.toLowerCase();
      }
    })
    
    var post = Post.initialize({title: "HUGE"})
    post.title_downcased()  #=> 'huge'
    

Controllers
===========

An eyeballs.js controller is also initialized with the eyeballs function, by passing a string name and an object containing the controller actions.

    o_O('PostsController', {
      new: function(){
        alert("I'm new");
      },
      create: function(){
        alert("I'm create");
      }
    })

Again, this looks nice and familiar. Dead, dead simple.

To bind events to these controller actions, use the data-controller and data-action attributes:

    <a href="/posts/new" data-controller="posts" data-action="new">Click me!</a>

Or alternatively, use the shorthand:

    <a href="/posts/new" data-bind="posts/new">Click me!</a>

This binds all clicks on this element to the new action on the PostsController. By default, if you add these attributes to a form, the action is bound to the submit event; to all other elements it binds to a click.

It also returns false, canceling out the default behavior. If you want the default behavior, you can add `data-default=true`:

    <a href="/posts/new" data-controller="posts" data-action="new" data-default="true">Click me!</a>
    
or in shorthand, prefix with a `+`:

    <a href="/posts/new" data-bind="+posts/new">Click me!</a>

You can also bind to custom events, using data-event:

    <a href="/posts/new" data-controller="posts" data-action="new" data-default="true" data-event="mouseover">Hover over me!</a>

Or in shorthand:

    <a href="/posts/new" data-bind="mouseover:posts/new">Click me!</a>

Finally, in shorthand only, you can bind multiple events to a single element:

    <a href="/posts/new" data-bind="mouseover:posts/preview; click: posts/new">Hover first, then Click me!</a>
    
Putting it all together
=======================

Running the tests
=================

eyeballs.js uses QUnit for in-browser testing. Just load the files in the test directory in any browser to run them.

About me
========

I'm Paul Campbell. I'm an avid Ruby on Rails and now, it seems, javascript web developer. Follow my ramblings at [http://www.pabcas.com](http://www.pabcas.com)

Follow me on Twitter [http://twitter.com/paulca](http://twitter.com/paulca)

Copyright (c) 2010 Paul Campbell, released under the MIT license