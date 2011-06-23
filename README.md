eyeballs.js
===========

eyeballs.js is a slim javascript library designed to sit on top of a javascript framework, such as jQuery or Prototype.

The goals are:

  * Organisation of client-side web app code using the Model-View-Controller pattern.
  * Simple model implementation for handling non event-related concerns.
  * Simple routing layer for hash-tag change based navigation, preserving the back-button
  * Rapid development of javascript apps using strong conventions.
  * Easing the pain of building fast, responsive interfaces.
  * Exploring the possibilities of offline web apps.

The implementation is owes a lot to Ruby on Rails, but also attempts to be idiomatic javascript.

Overview
--------

eyeballs.js can sit on top of an already implemented web app with a well thought out object model. It can also be used to build standalone javascript apps, backed by HTML5 local storage or something like CouchDB.

eyeballs.js models are not necessarily one-to-one mapped to server side models using your web framework of choice. They more closely map to interface elements, but there aren't really any rules as yet.

Finally, eyeballs.js is still a bit of an experiment. It's a quick implementation of a crazy idea to help make javascript code a little bit more organised.

eyeballs.js is supposed to be both agnostic and modular. The code is broken down into modules, drivers and adapters.

*Modules* add various parts of functionality, for example the code that powers the individual model, controller, routing and validation layers.
*Drivers* add support for underlying javascript frameworks. Features that rely on event handling etc. are part of driver logic.
*Adapters* provide an API to various persistence layers, eg. HTML5 Local Storage, a REST interface or a CouchDB instance.

Getting Started
---------------

eyeballs.js is packaged into modules, according to dependencies.

The main library has no dependencies and lets you use eyeballs.js models standalone.

Standalone, eyeballs.js doesn't do much: it provides the o\_O() function for initializing models and some validations.

At a very minimum, you should choose an adapter. There are a few to choose from:

  - **o\_O.dom** - a basic adapter without any persistence.
  - **o\_O.localstorage** - persist records to HTML5 local storage.
  - **o\_O.couchdb** - persist records to a local CouchDB instance, for building MVC CouchApps, for example.
  - **o\_O.rest** - An adapter for persisting models to a backend powered by Rails, or using Rails-style RESTful routing.

Finally, you need a controller. The first release of eyeballs.js includes a controller as part of the jQuery driver.

You can also use a javascript templating language. Mustache.js fits this need quite nicely.

Wrapping that all up, to use eyeballs.js with the Rails adapter and jQuery:

    <!-- jQuery and livequery -->
    <script src="vendor/javascripts/jquery.1.4.min.js"></script>
    <script src="vendor/jquery/jquery.ba-bbq.min.js"></script>
    
    <!-- Mustache for templating -->
    <script src="vendor/mustache/mustache.0.3.0.js"></script>
    
    <!-- eyeballs.js basic -->
    <script src="vendor/eyeballs/o_O.js"></script>
    <script src="vendor/eyeballs/modules/o_O.model.js"></script>
    <script src="vendor/eyeballs/modules/o_O.validations.js"></script>
    
    <!-- eyeballs.js jquery driver for controller logic -->
    <script src="vendor/eyeballs/drivers/jquery/modules/o_O.controller.js"></script>
    <script src="vendor/eyeballs/drivers/jquery/modules/o_O.support.js"></script>
    <script src="vendor/eyeballs/drivers/jquery/modules/o_O.routes.js"></script>
    
    <!-- REST adapter -->
    <script src="vendor/eyeballs/drivers/jquery/adapters/o_O.rest.js"></script>
    
    <!-- Configuration -->
    <script src="config/initializer.js"></script>
    <script src="config/routes.js"></script>

Badabing, badaboom! You're now ready to start creating some models and controllers.

Generators
----------

If you install the eyeballs.js Ruby gem, you can use the eyeballs command to generate eyeballs.js apps, models and controllers:

    gem install eyeballs
    
To create a new eyeballs.js app:

    eyeballs my_new_app

This will create a new app in the my\_new\_app folder.

When you're up and running, you can use the model and controller generators:

    eyeballs generate model Post
    eyeballs generate controller Posts

These generators will install files to app/models and app/controllers relative to where you run the `eyeballs` command.

You can also generate a scaffold:

    eyeballs generate scaffold Post
    
This will generate a `posts.html`, a `post.js` and a `posts_controller.js`.

If the generator detects a "public" directory when you run it, it will install into public/javascripts.

Models
------

You define a model by passing a name and function to the eyeballs ( o_O ) function (pronounced 'eep eep'). As inspired by Rails, model definitions are capitalised. Note, however, that the new prefix is not used.

    o_O('Post', function(){ })

You can now initialize an individual post:

    var post = Post.initialize({title: 'My New Post'});
    post.title //=> 'My New Post'

Not very exciting.

However, if you're familiar with Rails, you'll be familiar with the wonderful syntax for adding validations to your models. eyeballs.js lets you add validations to your models as follows:

    o_O('Post', function(){
      this.validates_presence_of('title')
    })

Now, when you initialize a new Post, you can validate it, nice and easy:

    var post = Post.initialize()
    post.valid()
    post.errors   // => [{
                  //     field: 'title',
                  //     message: 'title should be present',
                  //     type: 'presence'}]

and so on, so forth. This will be very familiar to those who use Rails.

You can also add your own validations, again, similar to how Rails does things:

    o_O('Post', function(){
      this.validates(function(post){
        if(post.title != 'Awesome')
        {
          post.errors.push({message: 'Not Awesome Enough'})
        }
      })
    })
    
    var post = Post.initialize()
    post.save(function(saved_post){
      post.errors   // => [{
                    //     message: 'title should be present'}]
    })              // yep, there's a save method too!
    
Even better, using the `invalid` callback:

    post.save({
      invalid: function(saved_post){
        // you can assume:
        saved_post.errors 
      }
    })
    
When you want to find things:

    Post.find({
      loading: function(){
        console.log("I'm loading...")
      },
      success: function(post){
        console.log("here I am")
      }
    })

And if you want to add your own methods:

    o_O('Post', function(){
      this.methods.title_downcased: function(){
        this.title.toLowerCase();
      }
    })
    
    var post = Post.initialize({title: "HUGE"})
    post.title_downcased()  //=> 'huge'
    
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
    
There's a strong emphasis on callbacks: since any persisting to backends should be done asynchronously.

Controllers
-----------

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

### Calling Controller Actions & Binding Events ###

There are several ways to bind events to controller actions.

#### Calling Directly ####

The simplest way to call controller actions is to bind them directly. From the above example, you can simply call:

    o_O('PostsController').new()

...once you have initialized your controller.

#### Routing ####

You can use the eyeballs.js router to bind events to changes in the URL hash. This is particularly effective for graceful degradation, as well as preserving the back button history.

Your `config/routes.js` file would look something like this:

    o_O.routes.draw(function(map){
      map.match('/posts/new/', {to: 'posts#new'})
    })

You can now bind this to particular links, by adding the `data-ajax-history` attribute to your `a` elements:

    <a href="/posts/new" data-ajax-history="true">Click Me!</a>
    
This link will now call `PostsController.new()` when it is clicked.

You can also set params in the URL, eg:

    o_O.routes.draw(function(map){
      map.match('/posts/:id/', {to: 'posts#show'})
    })

    <a href="/posts/1">Click Me for Post 1!</a>

or in the route:
    
    o_O.routes.draw(function(map){
      map.match('/posts/:id/', {to: 'posts#show', 'custom':'posts'})
    })
    
    o_O.params('custom') #=> 'post'
    
and your controller:
    
    o_O('PostsController', {
      show: function(){
        alert(o_O.params('id')) //=> '1'
      }
    })

If you want a default action to fire, that is when the `document.hash` is empty, just hook up a `map.root`:

    o_O.routes.draw(function(map){
      map.root({to: 'posts#index'})
    })
    
If you have several routes that share the same prefix, you can use a namespace:

    o_O.routes.draw(function(map){
      map.namespace('my', function(){
        map.match('posts/new', {to: "myposts#new"}) # hooks up to MypostsController.new()
      })
    })
    
Tasty!

#### Binding actions to events ####

To bind events to these controller actions, use the data-bind attribute:

    <a href="/posts/new" data-bind="posts#new">Click me!</a>

This binds all clicks on this element to the new action on the PostsController. By default, if you add these attributes to a form, the action is bound to the submit event; to all other elements it binds to a click.

It also returns false, canceling out the default behavior. If you want the default behavior, prefix with `+`  to "add" the action to the propagation chain:

    <a href="/posts/new" data-bind="+posts#new">Click me!</a>
    
You can also bind to custom events:

    <a href="/posts/new" data-bind="+mouseover:posts#new">Hover over me!</a>
    
You can bind multiple events and actions to a single element:

    <a href="/posts/new" data-bind="mouseover:posts#preview; click: posts/new">Hover first, then Click me!</a>
    
It's called "obtrusive UJS" ... explicit, yet everything has its own place.
    
Putting it all together
-----------------------

Imagine a simple app for posting reviews. It will comprise a "Review" model, "ReviewsController" and associated views.

`models/review.js` looks like this:

    o_O('Review', function(){
      this.validates_presence_of('title');
      this.validates_presence_of('content');
    });

This defines the Review model, allowing us to initialize and save Review objects, while ensuring `title` and `content` are included.

The `create` action in `controllers/reviews_controller.js` looks like this (using jQuery):

    ...
    create: function(){
      var review = Review.initialize(o_O.params('review'));
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

    <form data-bind="reviews#create">
      <label for="review-title">Title</label><br />
      <input type="text" name="title" value="" data-attribute="title"><br />
      <label for="review-content">Review</label><br />
      <textarea name="content" data-attribute="content"></textarea><br />
      <input type="submit" name="commit" value="Save">
    </form>

The main things to note here are the way that the form binds automatically to the create action (using jQuery event delegation). Also, field elements have the "data-attribute" attributes ... the o\_O.params() function reads from these, returning a JSON object that can be passed to Review.initialize(...).

Notice also `o_O.alert_errors(...)` which displays an alert of all the errors on an invalid review.

Finally, the o\_O.render function takes a template, which is a Mustache.js template stored in `views/`, the review object and a set of options.

Sample App
----------
Meview is a sample app for storing reviews:
Demo: http://meview.heroku.com
Code: https://github.com/paulca/meview

Running the tests
-----------------

eyeballs.js uses QUnit and a Sinatra app for in-browser testing.

To start the test server:

    ruby app.rb

To run all the tests, visit:

    http://localhost:4567/test/run_unit_tests.html

Contributors
------------
- Anthony Eden ([aeden](/aeden))
- Thorben Schröder ([walski](/walski))

About me
--------

I'm Paul Campbell. I'm an avid web developer. Follow my ramblings at [http://www.pabcas.com](http://www.pabcas.com)

Follow me on Twitter [http://twitter.com/paulca](http://twitter.com/paulca)

Copyright (c) 2010 Paul Campbell, released under the MIT license