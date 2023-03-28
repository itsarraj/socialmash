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

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets/'));

app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(
    session({
        name: 'socialmash',
        // TODO: Change the secret before deploying
        secret: 'xxxxxxxxxxxxxxxxxx',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 5,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Use Express Router

// app.use('/' , require('./routes/index')); // routes/index is fetched by default from routes
app.use('/', require('./routes'));

// Setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// fire up the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error running server: ${err}`);
    }
    console.log(`Server running on port ${port}`);
});
