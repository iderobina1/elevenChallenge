//dependencies

const express = require('express')
const fs = require('fs')

//setup express app
var app = express()
var PORT = proces.env.PORT || 3001

//setup the express app to handle data

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public/assets', express.static(__dirname + '/public/assets'))

require('./routes/html-routes')(app)
require('./routes/api-routes')(app)

//start the server to begin listenign
app.listen(PORT, function() {
    console.log('now listenting to PORT' + PORT)
})