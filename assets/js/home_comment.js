{
    /**
     * method to submit the form data
     * for new post using AJAX
     */
    let createComment = function () {
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: newCommentForm,
                success: function (data) {
                    let newComment = newCommentDom(data.data);
                    console.log('*()* :: ', data.data);
                    $('#posts-list-container > ul').prepend(newComment);
                    deleteComment($(' .delete-post-button', newComment));
                },
                error: function (err) {
                    console.log(err.responseText);
                },
            });
        });
    };

    /**
     * method to create a post in DOM
     */
    let newCommentDom = function (data) {
        return $(`
    <li id = "comment-${data.comment._id}" class="new-comment-section">

        <small>
            <a  href="/comments/destroy/${data.comment.mid}">
                <button name="Delete">X</button>
            </a>
        </small>


        <span class="comment-content">
            ${data.comment.content}
        </span>

        <br />

        <small class="comment-username">
            ${data.username}
        </small>
    </li>
        `);
    };

    /**
     * method to delete a post in DOM
     */
    let deleteComment = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    };

    createComment();
}
