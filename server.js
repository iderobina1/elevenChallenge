// Dependencies
const express = require('express');
const fs = require('fs');

// Set up express app
var app = express();
var PORT = process.env.PORT || 3001;

// Set up the express app to handle data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public/assets', express.static(__dirname + '/public/assets'));

// Require and set up your routes
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

// Start the server to begin listening
app.listen(PORT, function() {
    console.log('Now listening to PORT ' + PORT);
});
