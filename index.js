const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
// const sassMiddleware = require('node-sass-middleware');

// app.use(
//     sassMiddleware({
//         src: './assets/scss',
//         dest: './assets/css',
//         debug: true,
//         outputStyle: 'extended',
//         prefix: '/css',
//     })
// );

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./assets/'));
// make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db

app.use(
    session({
        name: 'socialmash',
        // TODO: Change the secret before deploying
        secret: 'VmYq3s6v',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 1000, // 1000 minutes
        },
        store: MongoStore.create(
            {
                mongoUrl: 'mongodb://127.0.0.1/socialmash_development',
                mongooseConnection: db,
                autoRemove: 'disabled',
            },
            function (err) {
                console.log(err || 'connec-mongodb setup ok');
            }
        ),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Use Express Router

// app.use('/' , require('./routes/index')); // routes/index is fetched by default from routes
app.use('/', require('./routes'));

// fire up the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error running server: ${err}`);
    }
    console.log(`Server running on port ${port}`);
});
