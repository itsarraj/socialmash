// Import required modules
const express = require('express'); // Express.js for building the web application
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser'); // Middleware for handling cookies
const app = express(); // Create an instance of Express app
const port = 8000; // Port number for the server to listen on
const expressLayouts = require('express-ejs-layouts'); // Middleware for handling EJS layouts
const db = require('./config/mongoose'); // Mongoose for connecting to MongoDB
// Passport and its authentication strategies
const session = require('express-session'); // Middleware for handling sessions
const passport = require('passport'); // Passport for authentication
const passportLocal = require('./config/passport-local-strategy'); // Local strategy for Passport
const passportJWT = require('./config/passport-jwt-strategy'); // JWT strategy for Passport
const passportGoogle = require('./config/passport-google-oauth2-strategy'); // Google OAuth2 strategy for Passport
const MongoStore = require('connect-mongo'); // Middleware for storing session data in MongoDB
const sassMiddleware = require('node-sass-middleware'); // Middleware for handling Sass preprocessing
const flash = require('connect-flash'); // Middleware for handling flash messages
const customMware = require('./config/middleware'); // Custom middleware for flash messages

const chatServer = require('http').createServer();
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server listening on port 5000');

const path = require('path');
// Use Sass middleware to preprocess SCSS files into CSS

if (env.name == 'development') {
    app.use(
        sassMiddleware({
            src: path.join(__dirname, env.asset_path, 'scss'),
            dest: path.join(__dirname, env.asset_path, 'css'),
            debug: true,
            outputStyle: 'extended',
            prefix: '/css',
        })
    );
}

app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use(cookieParser()); // Middleware for parsing cookies

app.use(express.static(env.asset_path)); // Middleware for serving static files from the assets directory
// Make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts); // Middleware for using EJS layouts
// Extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setup the view engine as EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Use MongoDB to store session data
app.use(
    session({
        name: 'socialmash', // Name of the session cookie
        secret: env.session_cookie_key, // Secret used for session encryption (TODO: Change this before deploying)
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 1000, // 1000 minutes
        },
        store: MongoStore.create(
            {
                mongoUrl: 'mongodb://127.0.0.1/socialmash_development', // MongoDB connection URL
                mongooseConnection: db, // Mongoose connection object
                autoRemove: 'disabled',
            },
            function (err) {
                console.log(err || 'connec-mongodb setup ok');
            }
        ),
    })
);

app.use(passport.initialize()); // Middleware for initializing Passport
app.use(passport.session()); // Middleware for handling Passport sessions

app.use(passport.setAuthenticatedUser); // Middleware for setting authenticated user in req object

app.use(flash()); // Middleware for handling flash messages
app.use(customMware.setFlash); // Middleware for setting flash messages

// Use Express Router for routing
app.use('/', require('./routes/index'));

// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error running server: ${err}`);
    }
    console.log(`Server running on port ${port}`);
});
