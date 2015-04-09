var test = require('tap').test
var fs = require('fs')

var analyze = require('../server/services/analyzeCsv')

var testDataFile = 'samples/Police_Stations_-_Map.csv'

test("make sure CSV analyzer works on sample file " + testDataFile, function (t) {
  

  var file = fs.createReadStream(testDataFile)
  analyze(file, function(fileStats, numRows) {
  	  t.equal(numRows, 23, testDataFile + ' has 23 rows')
  	  t.equal(fileStats.length, 7, testDataFile + ' has 7 columns')

  	  t.equal(fileStats[0]['Column Name'], 'DISTRICT', testDataFile + ' 1st column is called DISTRICT')
  	  t.equal(fileStats[1]['Column Name'], 'ADDRESS', testDataFile + ' 2nd column is called ADDRESS')
  	  t.equal(fileStats[2]['Column Name'], 'CITY', testDataFile + ' 3rd column is called CITY')
  	  t.equal(fileStats[3]['Column Name'], 'STATE', testDataFile + ' 4th column is called STATE')
  	  t.equal(fileStats[4]['Column Name'], 'ZIP', testDataFile + ' 5th column is called ZIP')
  	  t.equal(fileStats[5]['Column Name'], 'WEBSITE', testDataFile + ' 6th column is called WEBSITE')
  	  t.equal(fileStats[6]['Column Name'], 'LOCATION', testDataFile + ' 7th column is called LOCATION')

  	  t.equal(fileStats[0]['Fillness'], '100%', testDataFile + ' 1st column is 100% filled')
  	  t.equal(fileStats[1]['Fillness'], '100%', testDataFile + ' 2nd column is 100% filled')
  	  t.equal(fileStats[2]['Fillness'], '100%', testDataFile + ' 3rd column is 100% filled')
  	  t.equal(fileStats[3]['Fillness'], '100%', testDataFile + ' 4th column is 100% filled')
  	  t.equal(fileStats[4]['Fillness'], '100%', testDataFile + ' 5th column is 100% filled')
  	  t.equal(fileStats[5]['Fillness'], '91.3%', testDataFile + ' 6th column is 91.3% filled')
  	  t.equal(fileStats[6]['Fillness'], '100%', testDataFile + ' 7th column is 100% filled')

  	  t.equal(fileStats[0]['Unique Values'], 23, testDataFile + ' 1st column has 23 unique values')
  	  t.equal(fileStats[1]['Unique Values'], 23, testDataFile + ' 2nd column has 23 unique values')
  	  t.equal(fileStats[2]['Unique Values'], 1, testDataFile + ' 3rd column has 1 unique values')
  	  t.equal(fileStats[3]['Unique Values'], 1, testDataFile + ' 4th column has 1 unique values')
  	  t.equal(fileStats[4]['Unique Values'], 22, testDataFile + ' 5th column has 22 unique values')
  	  t.equal(fileStats[5]['Unique Values'], 21, testDataFile + ' 6th column has 23 unique values')
  	  t.equal(fileStats[6]['Unique Values'], 23, testDataFile + ' 7th column has 23 unique values')

  	  t.equal(fileStats[0]['Data Type'], 'string', testDataFile + ' 1st column is of `string` data type')
  	  t.equal(fileStats[1]['Data Type'], 'string', testDataFile + ' 2nd column is of `string` data type')
  	  t.equal(fileStats[2]['Data Type'], 'string', testDataFile + ' 3rd column is of `string` data type')
  	  t.equal(fileStats[3]['Data Type'], 'string', testDataFile + ' 4th column is of `string` data type')
  	  t.equal(fileStats[4]['Data Type'], 'data', testDataFile + ' 5th column is of `data` data type')
  	  t.equal(fileStats[5]['Data Type'], 'string', testDataFile + ' 6th column is of `string` data type')
  	  t.equal(fileStats[6]['Data Type'], 'string', testDataFile + ' 7th column is of `string` data type')

  	  t.end()
  })
})
