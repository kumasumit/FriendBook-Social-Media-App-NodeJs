console.log("sumit");
//A function to create a Post via Ajax
let createPost = function() {
    let newPostForm = $('#new-post-form');
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
                $('#new-post-form')[0].reset();
                //this will clear the data from with id new-post-form
            },
            error: function (error) {
                console.log(error.responseText);
            }

        })

    })

}
//here we call the createPost function
createPost();