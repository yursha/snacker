global.jQuery = require('jquery')
require('bootstrap')
require('./dropzone.jsx')
var trackMemory = require('./memory-usage-tracker.js')

/* set interval to ask server for memory usage */

setInterval(trackMemory, 10000)
