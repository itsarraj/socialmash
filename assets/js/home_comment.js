// /**
//  * method to submit the form data
//  * for new post using AJAX
//  */

class PostComments {
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function () {
            self.deleteComment($(this));
        });
    }

    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment(
                        $(' .delete-comment-button', newComment)
                    );
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    }

    newCommentDom(data) {
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${data.comment._id} class=" new-comment-section">
                        <p>

                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${data.comment._id}">
                                <button name="Delete">X</button>
                                </a>
                            </small>
                            <span class="comment-content">
                            ${data.comment.content}
                            </span>
                            <br>
                            <small>
                                ${data.username}
                            </small>
                        </p>

                </li>`);
    }

    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    }
}
