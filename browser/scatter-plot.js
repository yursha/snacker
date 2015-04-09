var defData = [
    {"isFile": false, "minute": 0, "memoryUsed": 0, "processingTime": 0} 
    ]

var chart = new tauCharts.Chart({
            guide:{
                x:{label: 'Calendar Minute', autoscale: false},
                y:{label:'Median Server App Memory Usage (bytes)'}
            },
            data: defData,
            type: 'scatterplot',           
            x: 'minute',
            y: 'memoryUsed',
            color: 'isFile',
            size: 'processingTime'
        })

chart.renderTo('#scatter')

module.exports = chart