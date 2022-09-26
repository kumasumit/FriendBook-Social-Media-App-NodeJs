console.log("rahul");
//A function to create a comment via Ajax
let createComment = function() {
    let newCommentForm = $('#new-comment-form');
    //here new-comment-form is the id of the form to create a comment in partials/post.ejs file
    //this is jquery for
    //document.getElementById('#new-comment-form')
    newCommentForm.submit(function (event) {
        //to prevent the default form's submit nature
        event.preventDefault();
        //this is where ajax post request starts
        $.ajax({
            type: "POST",
            url: "/comments/create",
            data: newCommentForm.serialize(),
            //serialize will convert the form data into json data
            //this will convert form data into key-value pairs
            //content: Body of content
            success: function (data) {
                console.log(data);
                $('#new-comment-form')[0].reset();
                //this will clear the data from with id new-post-form
            },
            error: function (error) {
                console.log(error.responseText);
            }
        })
    })
}
//here we call the createPost function
createComment();