/*
 * Polls server for memory usage
 */

var $ = require('jquery')
var scatterPlot = require('./scatter-plot')

var samples = []
var currentMinute = new Date().getMinutes()

module.exports = function() {
	$.get('/memory', '', function (data) {
		var now = new Date().getMinutes()
		if (now > currentMinute) {
			var medianValue = median(samples)
			plotMedian(medianValue, currentMinute)
			currentMinute = now
			samples = []
		} else {
			samples.push(data)
		}
	})
}

/*
 * Calculates a median for an array of numbers
 * 
 * @parram {data} array of numbers
 */
function median(data) {
	if (data.length) {
		return data.sort()[Math.floor(data.length / 2)]
	} else {
		return 0
	}
}

function plotMedian(median, minute) {
    scatterPlot.config.data.push({"isFile": false, "minute": minute, "memoryUsed": median, "processingTime": 1})
    scatterPlot.renderTo('#scatter')
}