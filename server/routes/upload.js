/* 
 * File upload controller
 */

var inspect = require('util').inspect
var Busboy = require('busboy')

var analyze = require('../services/analyzeCsv')

module.exports = function(req, res, next) {
  var busboy = new Busboy({ headers: req.headers })
  var responseData = {}
  var numFiles = 0

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    ++numFiles
    analyze(file, function(fileStats) {
      responseData[filename] = fileStats
      maybeSendResponse()
    })
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
    maybeSendResponse()
  })
    
  req.pipe(busboy)

  function maybeSendResponse() {
    if (Object.keys(responseData).length === numFiles) {
      res.json(responseData)
    }
  }
}
