// Importing the mongoose module for working with MongoDB
const mongoose = require('mongoose');

// Defining the postSchema using mongoose.Schema
const postSchema = new mongoose.Schema(
    {
        // Content of the post
        content: {
            type: String,
            required: true,
        },
        // User who posted the post
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Referencing the 'User' model
        },
        // Array of comments on the post
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment', // Referencing the 'Comment' model
            },
        ],
        // Array of likes on the post
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Like', // Referencing the 'Like' model
            },
        ],
    },
    {
        timestamps: true, // Adding timestamps to track createdAt and updatedAt fields
    }
);

// Creating a mongoose model for the 'Post' collection with the defined postSchema
const Post = mongoose.model('Post', postSchema);

// Exporting the 'Post' model for use in other parts of the application
module.exports = Post;
