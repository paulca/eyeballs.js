# Eyeballs #

eyeballs is a client side javascript framework for associating html views with javascript objects, and updating the views when the objects change.

## How it works ##

Let's start at the very start: a blog example.

We start with the very basics: an empty collection:

```html
<div data-collection="Post">
</div>
```

Now we tell eyeballs that we have a post model:

```javascript
o_O('Post')
```

That's it! Now if we load the page, the defaults kick in and we can add, edit and remove posts:

```javascript
o_O('Post').create({title:"My New Post", content: "My New Post"})
```

This will add the post to the collection.

## Templating ##

Of course, the above example will just use default views. You'll want to specify the html for each element in the collection. It's pretty easy to specify that when you initialize the model:

```javascript
o_O('Post', function(){
  this.to_html(function(model){
    return '<span class="post" data-model="Post" data-id="' +
            model.id +
            '">' + model.title + '</span>';
  })
})
```

It's pretty straightforward to use the view engine of your choice, eg. for [Mustache](https://github.com/janl/mustache.js):

```javascript
o_O('Post', function(){
  this.to_html(function(model){
    return Mustache.to_html(MyTemplate, model);
  })
})
```

## Custom selectors ##

The `[data-collection=MODELNAME]`, `[data-context=CONTEXT]`, `[data-model=MODELNAME]` and `[data-id=ID]` selectors work out of the box, but sometimes you'll want to specify your own. This is pretty easy too:

```javascript
o_O('Article', function(){
  this.collection_selector(function(model_name){
    //eg. '#articles'
    return '#' + model_name.toLowerCase() + 's';
  })
  this.instance_selector(function(model_name, attrs){
    // eg. '.article-1'
    return '.' + model_name.toLowerCase() + '_' + attrs.id;
  })
  this.to_html(function(model){
    return '<p class="article_' + model.id + '">' + model.title + '</p>';
  })
})
```