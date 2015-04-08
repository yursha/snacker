/* 
 * File upload controller
 */

var inspect = require('util').inspect
var Busboy = require('busboy')
var sleep = require('sleep').sleep

module.exports = function(req, res, next) {
  var busboy = new Busboy({ headers: req.headers })
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      file.on('data', function(data) {
        // console.log('Got ' + data.length + ' bytes')
      })
      file.on('end', function() {
        console.log('File uploaded ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
      })
    })
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      console.log('Field [' + fieldname + '] = ' + inspect(val))
    })
    busboy.on('finish', function() {
      res.json('OK!')
    })
    req.pipe(busboy)
}
