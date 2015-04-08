/*
 * This file configures Express application.
 *
 * Please note, that Express built-in view rendering is not used. The problem is
 * that it doesn't allow streaming and feature-based templates organization in
 * the file system.
 * @see https://strongloop.com/strongblog/bypassing-express-view-rendering-for-speed-and-modularity/
 */

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var http = require('http')
var util = require('util')

/* 
 * HTTP request handlers
 */
var index = require('./routes/index')
var upload = require('./routes/upload')

var app = express()

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

/*
 * Set up `static` middleware to serve static assets.
 *
 * @see http://expressjs.com/api.html#express.static
 */
app.use(express.static('static'))

/*
 * Request handlers
 */
app.get('/', index)
app.post('/upload', upload)

/*
 * 404 'Page Not Found' handler.
 *
 * This is the last normal request handler that is registered with Express.
 * This means it will be called only if no other routes matched.
 */
app.use(function(req, res, next) {
  res.status(404).send('Sorry. Can\'t find that!')
})

/*
 * Error handler.
 *
 * If Express encounters an error while handling the request this handler
 * will be invoked.
 */
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(err.status || 500).send('Oops... Something went wrong!')
})

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || 3000
app.set('port', port)


var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Snacker is listening on ' + host + ':' + port)
})
