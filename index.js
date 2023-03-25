const express = require('express');
const app = express();
const port = 8000;

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
