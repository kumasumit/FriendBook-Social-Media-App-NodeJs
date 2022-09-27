{
console.log("sumit");
//1st/main function to create a Post via Ajax

let createPost = function () {
  let newPostForm = $("#new-post-form");
  //here new-post-form is the id of the form to create a post in home.ejs file
  //this is jquery for
  //document.getElementById('#new-post-form')
  newPostForm.submit(function(event) {
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

        //a fuction call to paint new post to DOM
        let newPost = newPostDom(data.data.post);

        new PostComments(data.data.post._id);

        // CHANGE :: enable the functionality of the toggle like button on the new post
        // new ToggleLike($(" .toggle-like-button", newPost));

        // here we go to posts-lists-container and insde ul and prepend the newPost that we just added to the dom at the top, the latest post appears at the top
        $("#posts-list-container>ul").prepend(newPost);
        //this code will reset the form values to empty after successfull form ajax/jquery post request
        deletePost($(" .delete-post-button", newPost));
        //this will go inside new post and find the link with class delete-post-button
        $("#new-post-form")[0].reset();
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
// let newPostDom = function (post) {
//   //here post is the post we get from ajax request in posts_controller.js file with action create
//   //this post conatins id, content, comments: [], user: the populated user
//   return $(`<li id="post-${post._id}">
//     <!-- here we link post with post._id to uniquely identify the li when deleting the post -->
//     <p>
//           <small>
//             <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
//           </small>

//         ${post.content}<br />
//         <small>
//         ${post.user.name}
//         </small>

//     </p>
//     <!-- posts comment container -->
//     <div class="post-comments-${post._id}">
//             <form action="/comments/create" id="post-${post._id}-comments-form" method="POST">
//                 <input type="text" name="content" placeholder="Add Comments ...." required>
//                 <input type="hidden" name="post" value="${post._id}">
//                 <!-- here we are passing post.id as a hidden value with the content of the comment -->
//                 <input type="submit" value="Add Comment">
//             </form>

//         <!-- container to display comments for each post -->
//             <div class="post-comments-list">
//                 <ul id="post_comments_${post._id}">

//                 </ul>
//             </div>
//     </div>
// </li>`);
// };


let newPostDom = function (post) {
  // CHANGE :: show the count of zero likes on this post
  return $(`<li id="post-${post._id}">
              <p>

                  <small>
                      <a class="delete-post-button"  href="/posts/destroy/${post._id}">X</a>
                  </small>

                  ${post.content}
                  <br>
                  <small>
${post.user.name}
                  </small>
                  <br>
                  <small>

                          <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                              0 Likes
                          </a>

                  </small>

              </p>

<div class="post-comments">

                      <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                          <input type="text" name="content" placeholder="Type Here to add comment..." required>
                          <input type="hidden" name="post" value="${post._id}" >
                          <input type="submit" value="Add Comment">
                      </form>
<div class="post-comments-list">
                      <ul id="post-comments-${post._id}">

                      </ul>
                  </div>
              </div>

          </li>`)
}

//3rd function to delete a Post from the Dom via ajax delete request
//method to delete a post from DOM
// let deletePost = function (deleteLink) {
//   // console.log("sumit-rahul");
//   // console.log(deleteLink)
//   $(deleteLink).click(function (event) {
//     event.preventDefault();
//     //this will prevent the default behaviour on click of that delete link
//     // console.log("ritesh");
//     //here we make the ajax get request
//     $.ajax({
//       type: "GET",
//       url: $(deleteLink).prop("href"),
//       //this will give you href="/posts/destroy/<%= post.id %>"
//       // the complete value stored in href will pass here
//       success: function (data) {
//         // console.log(data.data.post_id);
//         // console.log($(`#post-${data.data.post_id}`));
//         // console.log(data);
//         $(`#post-${data.data.post_id}`).remove();
//         //this will remove the li with the post_id link from the ul of div with id posts-list-container
//       },
//       error: function (error) {
//         console.log(error.responseText);
//       },
//     });
//   });
// };
let deletePost = function (deleteLink) {
  $(deleteLink).click(function (e) {
    e.preventDefault();

    $.ajax({
      type: 'get',
      url: $(deleteLink).prop('href'),
      success: function (data) {
        console.log(data);
        $(`#post-${data.data.post_id}`).remove();
        // new Noty({
        //   theme: 'relax',
        //   text: "Post Deleted",
        //   type: 'success',
        //   layout: 'topRight',
        //   timeout: 1500

        // }).show();
      }, error: function (error) {
        console.log(error.responseText);
      }
    });
});
}

// loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
let convertPostsToAjax = function () {
    $('#posts-list-container>ul>li').each(function () {
      let self = $(this);
      let deleteButton = $(' .delete-post-button', self);
      deletePost(deleteButton);
      // get the post's id by splitting the id attribute
      let postId = self.prop('id').split("-")[1]
      new PostComments(postId);
    });
  }



createPost();
convertPostsToAjax();

}
