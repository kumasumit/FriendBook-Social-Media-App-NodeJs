// Let's implement this via classes
// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

function postComments(postId) {
    // console.log(postId)
    // console.log("executed once ")
    let postContainer = $(`#post-${postId}`);
    let newCommentForm = $(`#post-${postId}-comments-form`);

    // console.log(postContainer);
    // console.log(newCommentForm)

    let postObject = {
        postId: postId,
        postContainer: postContainer,
        newCommentForm: newCommentForm,
    };

    createComment(postId);

    // call for all the existing comments
    $(" .delete-comment-button", postObject.postContainer).each(function () {
        deleteComment($(this));
    });

    function createComment(postId) {
        // console.log("executed once in createComment")

        let pSelf = { ...postObject };
        postObject.newCommentForm.submit(function (e) {
            // console.log("inside prevent default ---")
            e.preventDefault();
            let self = this;
            // console.log(this);
            $.ajax({
                type: "post",
                url: "/comments/create",
                data: $(self).serialize(),
                success: function (data) {
                    // console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    // console.log(postId)
                    // console.log(newComment)

                    $(`#post_comments_${postId}`).prepend(newComment);
                    // $(`#post-comments-${postId}`).prepend(newComment);
                    // $(`.post-comments-list > ul`).prepend(newComment);

                    deleteComment($(" .delete-comment-button", newComment));
                    $(postObject.newCommentForm)[0].reset();
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    }

    function deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteLink).prop("href"),
                success: function (data) {
                    // console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    }

    function newCommentDom(comment) {
        // console.log(" call inside newCommentDom ")

        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${comment._id}">
                        <p>
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>

                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>
                </li>`);
    }
}
