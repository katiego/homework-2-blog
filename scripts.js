$(function() {

  function Post(date, text) {
    this.date = date;
    this.text = text;
  }


 Post.all = [];
 console.log('works')


  Post.prototype.save = function() {
// store our new post
    Post.all.push(this);
    console.log(Post.all);
  };

// render adn save new posts to the page / array

Post.prototype.render = function() {
    var $post = $(postTemplate(this));
    this.index = Post.all.indexOf(this);
    $post.attr('data-index', this.index);
    $postList.append($post);
  };

  // form to create new post
  var $newPost = $('#new-post');

  // element to hold our list of posts
  var $postList = $('#post-list');

  // post template
  var postTemplate = _.template($('#post-template').html());

  // append existing posts
  _.each(Post.all, function (post, index) {
    post.render();
  });

  // submit form to create new post
  $newPost.on('submit', function(event) {
    event.preventDefault();

    // create new toDo object from form data
    var postDate = $('#post-date').val();
    var postText = $('#post-text').val();
    var post= new Post(postDate, postText);

    // save post
    post.save();

    // render post
    post.render();

    // reset the form
    $newPost[0].reset();
    $('#post-due').focus();
  });

  // add class to todo on click to mark it as done
  $postList.on('click', '.post-text', function() {
    $(this).toggleClass('done');
  });

  // remove post from model and view
  $postList.on("click", ".delete", function () {
    var $post = $(this).closest(".post");
    var index = $post.attr('data-index');

    // remove post from the `Post.all` array (model)
  Post.all.splice(index, 1);
    console.log(Post.all);

    // remove post from the DOM (view)
    $post.remove();

    // reset indexes in DOM to match `Post.all` array
    // $.each loops through DOM elements
    $('.post').each(function(index) {
      $(this).attr('data-index', index);
    });
  });

});
