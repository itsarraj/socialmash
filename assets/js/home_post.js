{
    /**
     * method to submit the form data
     * for new post using AJAX
     */
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data);
                    console.log('*()* :: ', data.data);
                    $('#posts-list-container > ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    new PostComments(data.data.post._id);
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
    let newPostDom = function (data) {
        return $(`
        <li id="post-${data.post._id}">

            <p>
                <small>
                   <a class="delete-post-button" href="/posts/destroy/${data.post._id}">
                   <button name="Delete">X</button>
                   </a>
                </small>

                <div>
                    ${data.post.content}
                </div>
                <br />
                <small>
                    ${data.username}
                </small>
            </p>

            <div class="post-comments">

                <form id="post-${data.post._id}-comments-form" action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Comment Here" required />
                        <input type="hidden" name="post" value="${data.post._id}" />
                        <input type="submit" value="Add Comment" />
                </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${data.post._id}">
                    </ul>
                </div>

            </div>
        </li>

        `);
    };

    /**
     * method to delete a post in DOM
     */
    let deletePost = function (deleteLink) {
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

    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split('-')[1];
            new PostComments(postId);
        });
    };

    createPost();
    convertPostsToAjax();
}
