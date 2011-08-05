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