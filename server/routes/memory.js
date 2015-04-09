module.exports = function(req, res, next) {
  res.send(process.memoryUsage().heapUsed + '')
}