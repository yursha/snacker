var defData = [
    {"isFile": true, "minute": 0, "memoryUsed": 50, "processingTime": 100}, 
    {"isFile": false, "minute": 1, "memoryUsed": 20, "processingTime": 1}, 
    {"isFile": false, "minute": 2, "memoryUsed": 21, "processingTime": 1}, 
    {"isFile": false, "minute": 3, "memoryUsed": 22, "processingTime": 1}, 
    {"isFile": true, "minute": 4, "memoryUsed": 60, "processingTime": 590}, 
    {"isFile": false, "minute": 5, "memoryUsed": 25, "processingTime": 1}, 
    {"isFile": false, "minute": 6, "memoryUsed": 26, "processingTime": 1}, 
    {"isFile": true, "minute": 7, "memoryUsed": 90, "processingTime": 453}, 
    {"isFile": true, "minute": 8, "memoryUsed": 120, "processingTime": 110}, 
    {"isFile": false, "minute": 9, "memoryUsed": 30, "processingTime": 1}, 
    {"isFile": false, "minute": 10, "memoryUsed": 32, "processingTime": 1}, 
    {"isFile": false, "minute": 11, "memoryUsed": 33, "processingTime": 1}, 
    {"isFile": false, "minute": 12, "memoryUsed": 29, "processingTime": 1}, 
    {"isFile": false, "minute": 13, "memoryUsed": 28, "processingTime": 1}, 
    {"isFile": false, "minute": 14, "memoryUsed": 27, "processingTime": 1}, 
    {"isFile": true, "minute": 24, "memoryUsed": 67, "processingTime": 193}, 
    {"isFile": false, "minute": 34, "memoryUsed": 30, "processingTime": 1}, 
    {"isFile": false, "minute": 35, "memoryUsed": 29, "processingTime": 1}, 
    {"isFile": false, "minute": 45, "memoryUsed": 28, "processingTime": 1}, 
    {"isFile": true, "minute": 50, "memoryUsed": 80, "processingTime": 455}, 
    {"isFile": false, "minute": 51, "memoryUsed": 35, "processingTime": 1}, 
    {"isFile": false, "minute": 52, "memoryUsed": 34, "processingTime": 1}, 
    {"isFile": false, "minute": 53, "memoryUsed": 33, "processingTime": 1}, 
    {"isFile": false, "minute": 54, "memoryUsed": 32, "processingTime": 1}, 
    {"isFile": true, "minute": 4, "memoryUsed": 78, "processingTime": 488}, 
    {"isFile": false, "minute": 6, "memoryUsed": 36, "processingTime": 1}, 
    {"isFile": false, "minute": 13, "memoryUsed": 35, "processingTime": 1}, 
    {"isFile": false, "minute": 16, "memoryUsed": 33, "processingTime": 1}, 
    {"isFile": true, "minute": 59, "memoryUsed": 82, "processingTime": 233}, 
    {"isFile": false, "minute": 12, "memoryUsed": 35, "processingTime": 1}, 
    {"isFile": false, "minute": 15, "memoryUsed": 34, "processingTime": 1}
    ]

var chart = new tauCharts.Chart({
            guide:{
                x:{label: 'Calendar Minute', autoscale: false},
                y:{label:'Median Memory Usage'}
            },
            data: defData,
            type: 'scatterplot',           
            x: 'minute',
            y: 'memoryUsed',
            color: 'isFile',
            size: 'processingTime'
        })

chart.renderTo('#scatter')