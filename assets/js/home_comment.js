// {
//     /**
//      * method to submit the form data
//      * for new post using AJAX
//      */
//     let createComment = function () {
//         let newCommentForm = $('#new-comment-form');
//         newCommentForm.submit(function (e) {
//             e.preventDefault();
//             $.ajax({
//                 type: 'POST',
//                 url: '/comments/create',
//                 data: newCommentForm,
//                 success: function (data) {
//                     let newComment = newCommentDom(data.data);
//                     console.log('*()* :: ', data.data);
//                     $('#posts-list-container > ul').prepend(newComment);
//                     deleteComment($(' .delete-post-button', newComment));
//                 },
//                 error: function (err) {
//                     console.log(err.responseText);
//                 },
//             });
//         });
//     };

//     /**
//      * method to create a post in DOM
//      */
//     let newCommentDom = function (data) {
//         return $(`
//     <li id = "comment-${data.comment._id}" class="new-comment-section">

//         <small>
//             <a  href="/comments/destroy/${data.comment.mid}">
//                 <button name="Delete">X</button>
//             </a>
//         </small>

//         <span class="comment-content">
//             ${data.comment.content}
//         </span>

//         <br />

//         <small class="comment-username">
//             ${data.username}
//         </small>
//     </li>
//         `);
//     };

//     /**
//      * method to delete a post in DOM
//      */
//     let deleteComment = function (deleteLink) {
//         $(deleteLink).click(function (e) {
//             e.preventDefault();
//             $.ajax({
//                 type: 'GET',
//                 url: $(deleteLink).prop('href'),
//                 success: function (data) {
//                     $(`#post-${data.data.post_id}`).remove();
//                 },
//                 error: function (error) {
//                     console.log(error.responseText);
//                 },
//             });
//         });
//     };

//     createComment();
// }

// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

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
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment(
                        $(' .delete-comment-button', newComment)
                    );

                    // new Noty({
                    //     theme: 'relax',
                    //     text: 'Comment published!',
                    //     type: 'success',
                    //     layout: 'topRight',
                    //     timeout: 1500,
                    // }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    }

    newCommentDom(comment) {
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

    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    // new Noty({
                    //     theme: 'relax',
                    //     text: 'Comment Deleted',
                    //     type: 'success',
                    //     layout: 'topRight',
                    //     timeout: 1500,
                    // }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    }
}
