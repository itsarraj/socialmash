// Importing the mongoose module for working with MongoDB
const mongoose = require('mongoose');

// Defining the commentSchema using mongoose.Schema
const commentSchema = new mongoose.Schema(
    {
        // Content of the comment
        content: {
            type: String,
            required: true,
        },
        // User who posted the comment
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Referencing the 'User' model
        },
        // Post to which the comment belongs
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post', // Referencing the 'Post' model
        },
        // Array of likes on the comment
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

// Creating a mongoose model for the 'Comment' collection with the defined commentSchema
const Comment = mongoose.model('Comment', commentSchema);

// Exporting the 'Comment' model for use in other parts of the application
module.exports = Comment;
