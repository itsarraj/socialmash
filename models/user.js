// Importing the required modules
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Defining the path for storing user avatars
const AVATAR_PATH = path.join('/uploads/users/avatars');

// Defining the userSchema using mongoose.Schema
const userSchema = new mongoose.Schema(
    {
        // Email of the user
        email: {
            type: String,
            required: true,
            unique: true,
        },
        // Password of the user
        password: {
            type: String,
            required: true,
        },
        // Name of the user
        name: {
            type: String,
            required: true,
        },
        // Avatar of the user
        avatar: {
            type: String,
        },
        friendsips: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Friendship',
            },
        ],
    },
    {
        timestamps: true, // Adding timestamps to track createdAt and updatedAt fields
    }
);

// Configuring multer for uploading user avatars
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

// Adding static methods to the userSchema
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
    'avatar'
);
userSchema.statics.avatarPath = AVATAR_PATH;

// Creating a mongoose model for the 'User' collection with the defined userSchema
const User = mongoose.model('User', userSchema);

// Exporting the 'User' model for use in other parts of the application
module.exports = User;
