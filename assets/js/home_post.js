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
                    let newPost = newPostDom(data.data.post);
                    console.log('*()* :: ', data);
                    $('#posts-list-container > ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
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
    let newPostDom = function (post) {
        return $(`
        <li id="post-${post._id}">

            <p>
                <small>
                   <a class="delete-post-button" href="/posts/destroy/${post._id}">
                   <button name="Delete">X</button>
                   </a>
                </small>

                <div>
                    ${post.content}
                </div>
                <br />
                <small>
                    ${post.user.name}
                </small>
            </p>

            <div class="post-comments">

                <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Comment Here" required />
                        <input type="hidden" name="post" value="${post._id}" />
                        <input type="submit" value="Add Comment" />
                </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
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

    createPost();
}
