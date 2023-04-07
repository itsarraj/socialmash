// Importing the mongoose module for working with MongoDB
const mongoose = require('mongoose');

// Defining the likeSchema using mongoose.Schema
const likeSchema = new mongoose.Schema(
    {
        // User who performed the like action
        user: {
            type: mongoose.Schema.ObjectId,
        },
        // Object ID of the liked object
        likeable: {
            type: mongoose.Schema.ObjectId,
            required: true,
            refPath: 'onModel',
        },
        // Field used to define the type of the liked object, as it is a dynamic reference
        onModel: {
            type: String,
            required: true,
            enum: ['Post', 'Comment'], // Enumerated values for 'onModel' field, representing types of liked objects
        },
    },
    { timestamps: true } // Adding timestamps to track createdAt and updatedAt fields
);

// Creating a mongoose model for the 'Like' collection with the defined likeSchema
const Like = mongoose.model('Like', likeSchema);

// Exporting the 'Like' model for use in other parts of the application
module.exports = Like;
