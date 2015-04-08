/*
 * Loads initial Single Page Application
 */

var path = require('path')

module.exports = function(req, res, next) {

  // Resolve filepath manually as Express forbids using relative path names in `res.sendFile`
  var filepath = path.resolve(__dirname, '../views/index.html')
  res.sendFile(filepath)
}
