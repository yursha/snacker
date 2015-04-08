var csv = require('csv-parser')

/*
 * @param file {Stream} file to analyze
 */
module.exports = function (file) {
	var stats = { rowsNum: 0 }
	file.pipe(csv())
		.on('data', function(data) {
			inspectRow(stats, data)
		})
		.on('end', function() {
			console.log(stats)
		}) 
		.on('error', function(error) {
			console.log(error)
		})
}

/*
 * Inspects unique and empty values in a `row`. Writes results to `stats`.
 *
 * @param {stats} Accumulator for statistics
 * @param {row} A row to inspect
 */
function inspectRow(stats, row) {
	++stats.rowsNum

	for (var columnName in row) {
	  var columnStats = stats[columnName]
	  var value = row[columnName]
	  
	  // if a statistics gathering for a column has not yet started (i.e. we see a column name for the first time)
	  if (!columnStats) {
	  	columnStats = {
	  		empty: 0,
	  		type: typeof row[columnName],
	  		uniqueValues: {}
	  	}
	  	stats[columnName] = columnStats
	  }

	  // if an empty value is met then remember it and go to next
	  if (value === '') {
	  	++columnStats.empty
	  	continue
	  }

	  // if a new unique value is met then remember it
	  if (!columnStats.uniqueValues[value]) {
	  	columnStats.uniqueValues[value] = true
	  }

	}
}
