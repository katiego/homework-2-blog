$(function() {

  function Post(date, text) {
    this.date = date;
    this.text = text;
  }

  // `ToDo.all` contains our seed data
  // ToDo.all = [];
 Post.all = [];
 console.log('works')

  // ToDo.prototype.save = function() {
  //   // store our new todo
  //   ToDo.all.push(this);
  //   console.log(ToDo.all);
  // };

  Post.prototype.save = function() {
    // store our new todo
    Post.all.push(this);
    console.log(Post.all);
  };

  // ToDo.prototype.render = function() {
  //   // append our new todo to the page
  //   var $todo = $(toDoTemplate(this));
  //   this.index = ToDo.all.indexOf(this);
  //   $todo.attr('data-index', this.index);
  //   $toDoList.append($todo);
  // };

Post.prototype.render = function() {
    // append our new todo to the page
    var $post = $(postTemplate(this));
    this.index = Post.all.indexOf(this);
    $post.attr('data-index', this.index);
    $postList.append($post);
  };

  // form to create new todo
  var $newPost = $('#new-post');

  // element to hold our list of todos
  var $postList = $('#post-list');

  // todo template
  var postTemplate = _.template($('#post-template').html());

  // append existing todos (from seed data) to `$toDoList`
  // `_.each` is an "iterator" function provided by Underscore.js
  _.each(Post.all, function (post, index) {
    post.render();
  });

  // submit form to create new todo
  $newPost.on('submit', function(event) {
    event.preventDefault();

    // create new toDo object from form data
    var postDate = $('#post-date').val();
    var postText = $('#post-text').val();
    var post= new Post(postDate, postText);

    // save toDo
    post.save();

    // render toDo
    post.render();

    // reset the form
    $newPost[0].reset();
    $('#post-due').focus();
  });

  // add class to todo on click to mark it as done
  $postList.on('click', '.post-text', function() {
    $(this).toggleClass('done');
  });

  // remove todo from model and view
  $postList.on("click", ".delete", function () {
    var $post = $(this).closest(".post");
    var index = $post.attr('data-index');

    // remove todo from the `ToDo.all` array (model)
    post.all.splice(index, 1);
    console.log(Post.all);

    // remove todo from the DOM (view)
    $post.remove();

    // reset indexes in DOM to match `ToDo.all` array
    // $.each loops through DOM elements
    $('.post').each(function(index) {
      $(this).attr('data-index', index);
    });
  });

});
