var csv = require('csv-parser')

/*
 * @param file {Stream} file to analyze
 */
module.exports = function (file, callback) {
	var stats = {}
	var resultArray = []
	var rowsNum = 0
	file.pipe(csv({raw: false}))
		.on('data', function(data) {
			++rowsNum
			inspectRow(stats, data)
		})
		.on('end', function() {
			for (var columnName in stats) {
				columnStats = stats[columnName]

				var result = {}
				result['Column Name'] = columnName
				result['Fillness'] = Math.round((1 - columnStats.empty / rowsNum) * 10000) / 100 + '%'
				result['Unique Values'] = Object.keys(columnStats.uniqueValues).length
				result['Data Type'] = columnStats.isData ? 'data' : 'string'
				resultArray.push(result)
			}
			callback(resultArray, rowsNum)
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
	for (var columnName in row) {
	  var columnStats = stats[columnName]
	  var value = row[columnName]
	  
	  // if statistics gathering for a column has not yet started (i.e. we see a column name for the first time)
	  if (!columnStats) {
	  	columnStats = {
	  		empty: 0,
	  		isData: true, 
	  		uniqueValues: {}
	  	}
	  	stats[columnName] = columnStats
	  }

      // if at least one value in a column is not `data` then consider that column to have `string` type.
	  if (columnStats.isData && !isData(value)) {
	  	columnStats.isData = false
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

/*
 * Checks if a value is of type `data` or `string`.
 * Numeric and boolean values are considered to be of type 'data', all other values are considered to be of type 'string'.
 *
 * @param {num} Value to check
 */
function isData(num) {
	return !isNaN(+num)
}
