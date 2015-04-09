var $ = require('jquery')

var samples = []

module.exports = function() {
	$.get('/memory', '', function (data, status) {
		console.log('data = ' + data + ', status = ' + status)
	})
}