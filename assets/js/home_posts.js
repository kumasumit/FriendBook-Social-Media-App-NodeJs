console.log("sumit");
//1st/main function to create a Post via Ajax
let createPost = function () {
  let newPostForm = $("#new-post-form");
  //here new-post-form is the id of the form to create a post in home.ejs file
  //this is jquery for
  //document.getElementById('#new-post-form')
  newPostForm.submit(function (event) {
    //to prevent the default form's submit nature
    event.preventDefault();
    //this is where ajax post request starts
    $.ajax({
      type: "POST",
      url: "/posts/create",
      data: newPostForm.serialize(),
      //serialize will convert the form data into json data
      //this will convert form data into key-value pairs
      //content: Body of content
      success: function (data) {
        console.log(data);

        let newPost = newPostDom(data.data.post);
        // here we go to posts-lists-container and insde ul and prepend the newPost that we just added to the dom at the top, the latest post appears at the top
        $('#posts-list-container>ul').prepend(newPost);
        //this code will reset the form values to empty after successfull form ajax/jquery post request
        deletePost($(' .delete-post-button', newPost));
        //this will go inside new post and find the link with class delete-post-button
        $('#new-post-form')[0].reset();
        //this will clear the data from with id new-post-form
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
};

//2nd function to create a Post in the Dom for displaying created Post from above
//this function paints the newly created post on to the Dom without referesh
let newPostDom = function (post) {
  //here post is the post we get from ajax request in posts_controller.js file with action create
  //this post conatins id, content, comments: [], user: userId and not the populated user
  return $(`<li id="post-${post._id}">
    <!-- here we link post with post._id to uniquely identify the li when deleting the post -->
    <p>
          <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
          </small>

        ${post.content}<br />
        <small>
        ${post.user.name}
        </small>

    </p>
    <!-- posts comment container -->
    <div class="post-comments">
            <form action="/comments/create" id="new-comment-form" method="POST">
                <input type="text" name="content" placeholder="Add Comments ...." required>
                <input type="hidden" name="post" value="${post._id}">
                <!-- here we are passing post.id as a hidden value with the content of the comment -->
                <input type="submit" value="Add Comment">
            </form>

        <!-- container to display comments for each post -->
            <div class="post-comments-list">
                <ul id="post_comments_${post._id}">
                </ul>
            </div>
    </div>
</li>`);
};

//3rd function to delete a Post from the Dom via ajax delete request
//method to delete a post from DOM
 let deletePost = function(deleteLink){
    console.log("sumit-rahul");
    $(deleteLink).click(function(event){
        event.preventDefault();
        //this will prevent the default behaviour on click of that delete link
        // console.log("ritesh");
        //here we make the ajax get request
        $.ajax({
            type: 'GET',
            url: $(deleteLink).prop('href'),
            //this will give you href="/posts/destroy/<%= post.id %>"
            // the complete value stored in href will pass here
            success: function(data){
                // console.log(data.data.post_id);
                // console.log($(`#post-${data.data.post_id}`));
                $(`#post-${data.data.post_id}`).remove();
                //this will remove the li with the post_id link from the ul of div with id posts-list-container
            } ,
            error: function(error){
                console.log(error.responseText);
            }
        })
    })
}



//here we call the createPost function
createPost();
