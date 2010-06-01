eyeballs.js
===========

eyeballs.js is a slim javascript library designed to sit on top of a javascript framework, such as jQuery or Prototype.

The goals are:

  * Organisation of client-side web app code using the Model-View-Controller pattern.
  * Simple model implementation for client-side form validation.
  * Rapid development of javascript actions using strong conventions.
  * Easing the pain of building fast, responsive interfaces.
  * Exploring the possibilities of offline web apps.

The implementation is owes a lot to Ruby on Rails, but also attempts to be idiomatic javascript.

Overview
========

eyeballs.js can sit on top of an already implemented web app with a well thought out object model. It can also be used to build standalone javascript apps, backed by HTML5 local storage or something like CouchDB.

eyeballs.js models are not necessarily one-to-one mapped to server side models using your web framework of choice. They more closely map to interface elements, but there aren't really any rules as yet.

Finally, eyeballs.js is still a bit of an experiment. It's a quick implementation of a crazy idea to help make javascript code a little bit more organised.

Getting Started
===============

eyeballs.js is packaged into modules, according to dependencies.

The main lib, o\_O.js, has no dependencies and lets you use eyeballs.js models standalone.

Standalone, o\_O.js doesn't do much: it provides the o\_O() function for initializing models and some validations.

At a very minimum, you should choose an adapter. There are a few to choose from:

  - **o\_O.dom** - a basic adapter without any persistence.
  - **o\_O.localstorage** - persist records to HTML5 local storage.
  - **o\_O.couchdb** - persist records to a local CouchDB instance, for building MVC CouchApps, for example.
  - **o\_O.rails** - An adapter for persisting models to a backend powered by Rails, or using Rails-style RESTful routing.

Finally, you need a controller. The first release of eyeballs.js includes a controller initializer for jQuery. This adapter happens to depend on jQuery.livequery, for reasons of magic.

You can also use a javascript templating language. Mustache.js fits this need quite nicely.

Wrapping that all up, to use eyeballs.js with the Rails adapter and jQuery:

    <!-- jQuery and livequery -->
    <script src="http://jquery.com/src/jquery-latest.js"></script>
    <script src="jquery.livequery.js"></script>
    
    <!-- Mustache for templating -->
    <script src="mustache.js"></script>
    
    <!-- eyeballs.js -->
    <script src="o_O.js"></script>
    <script src="jquery.o_O.js"></script>
    
    <!-- Rails adapter -->
    <script src="o_O.rails.js"></script>
  
Badabing, badaboom! You're now ready to start creating some models and controllers.


Models
======

You define a model by passing a name and function to the eyeballs ( o_O ) function (pronounced 'eep eep'). As inspired by Rails, model definitions are capitalised. Note, however, that the new prefix is not used.

    o_O('Post', function(post){ })

You can now initialize an individual post:

    var post = Post.initialize({title: 'My New Post'});
    post.title #=> 'My New Post'

Not very exciting.

However, if you're familiar with Rails, you'll be familiar with the wonderful syntax for adding validations to your models. eyeballs.js lets you add validations to your models as follows:

    o_O('Post', function(post){
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

    o_O('Post', function(post){
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

    o_O('Post', function(post){
      post.methods.title_downcased: function(){
        this.title.toLowerCase();
      }
    })
    
    var post = Post.initialize({title: "HUGE"})
    post.title_downcased()  #=> 'huge'
    
Connecting to an adapter:

If you want to hook eyeballs.js up to the local storage adapter for example:

    o_O.model.adapter = o_O.localstorage
    
Finding, saving, updating and deleting. With callbacks? Easy peasy:

    post = Post.initialize({title: 'My new post'})
    post.save({
      invalid: function(post){
        alert('Sorry, invalid!');
      },
      loading: function(post){
        alert('I hapeen straight away');
      },
      success: function(post){
        alert('Saved, whoop!');
      }
    })

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

This binds all clicks on this element to the new action on the PostsController. By default, if you add these attributes to a form, the action is bound to the submit event; to all other elements it binds to a click.

It also returns false, canceling out the default behavior. If you want the default behavior, you can add `data-default=true`:

    <a href="/posts/new" data-controller="posts" data-action="new" data-default="true">Click me!</a>
    
You can also bind to custom events, using data-event:

    <a href="/posts/new" data-controller="posts" data-action="new" data-default="true" data-event="mouseover">Hover over me!</a>
    
There's also a shorthand for binding:

Bind clicks to PostsController#new

    <a href="/posts/new" data-bind="posts/new">Click me!</a>
    
Disable returning false to continue propagating new events:

    <a href="/posts/new" data-bind="+posts/new">Click me!</a>

Custom events:

    <a href="/posts/new" data-bind="mouseover:posts/new">Click me!</a>

Finally, in shorthand only, you can bind multiple events to a single element:

    <a href="/posts/new" data-bind="mouseover:posts/preview; click: posts/new">Hover first, then Click me!</a>
    
Isn't that cool?
    
Putting it all together
=======================

There's a small demo app included in this package, a simple app for adding personal reviews. It's a simple Sinatra app, so you can run it with:

    ruby app.rb

And then visit it in a browser at `localhost:4567`

It should all "just work" ... in a browser that supports HTML5 local storage.

`models/review.js` looks like this:

    o_O('Review', function(review){
      review.validates_presence_of('title');
      review.validates_presence_of('content');
    });

This defines the Review model, allowing us to initialize and save Review objects.

The `create` action in `controllers/reviews_controller.js` looks like this:

    ...
    create: function(){
      var review = Review.initialize(o_O.params($(this)));
      var form = $(this);
      review.save({o
        invalid: function(review){
          o_O.alert_errors(review);
        },
        success: function(review){
          o_O.render('reviews/_review', review, {prepend: 'div#reviews'});
          form.find('input[type=text], textarea').val('');
        }
      })
    }
    ...

The form that hooks up to this action is like this:

    <form data-controller="reviews" data-action="create">
      <label for="review-title">Title</label><br />
      <input type="text" name="title" value="" data-attribute="title"><br />
      <label for="review-content">Review</label><br />
      <textarea name="content" data-attribute="content"></textarea><br />
      <input type="submit" name="commit" value="Save">
    </form>

The main things to note here are the way that the form binds automatically to the create action (using jQuery). Also, field elements have the "data-attribute" attributes ... the o\_O.params() function reads from these, returning a JSON object that can be passed to Review.initialize(...).

Notice also `o\_O.alert_errors(...)` which displays an alert of all the errors on an invalid review.

Finally, the o\_O.render function takes a template, which is a Mustache.js template stored in `views/`, the review object and a set of options.

This is all very early stuff, but please feel free to play and feedback.

That's all for now!
    

Running the tests
=================

eyeballs.js uses QUnit for in-browser testing. Just load the files in the test directory in any browser to run them.

About me
========

I'm Paul Campbell. I'm an avid Ruby on Rails and now, it seems, javascript web developer. Follow my ramblings at [http://www.pabcas.com](http://www.pabcas.com)

Follow me on Twitter [http://twitter.com/paulca](http://twitter.com/paulca)

Copyright (c) 2010 Paul Campbell, released under the MIT license