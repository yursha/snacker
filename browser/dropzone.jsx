var $ = require('jquery')
var React = require('react')
var Dropzone = require('react-dropzone')
var Griddle = require('griddle-react')
var scatterPlot = require('./scatter-plot')
var util = require('util')

function handleProgress(e, progressBar){
    if(e.lengthComputable){
      var progress = Math.round(e.loaded / e.total) * 100 + '%'
      progressBar.css('width', progress).text(progress)
    }
}

var DropzoneDemo = React.createClass({
    onDrop: function (files) {
      var progressBar = $(document.getElementById('progress-bar'))
      progressBar.parent().removeClass('hidden')
      console.log(progressBar.parent()[0])
      console.log('Received files: ', files)
      var formData = new FormData()
      files.forEach(function(file) {
        console.log(file)
        formData.append('files', file)
      })
      $.ajax({
        url: 'upload',
        type: 'post',
        xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
              myXhr.upload.addEventListener('progress',function (e) {
                handleProgress(e, progressBar)
              }, false);
            }
            return myXhr;
        },
        //Ajax events
        beforeSend: null,
        success: function(message, status, request) {
          var tablesArea = document.getElementById('csv-stats-tables-area')
          Object.keys(message).forEach(function (filename) {
            // enrich scatter plot
            scatterPlot.config.data.push({"isFile": true, "minute": new Date().getMinutes(), "memoryUsed": message[filename].memoryUsage, "processingTime": message[filename].processingTime})
            scatterPlot.renderTo('#scatter')

            // create table
            var div = document.createElement('div')
            $(tablesArea).prepend(div)
            React.render(
              <div>
                <h2>
                  <span className="text-warning">{filename}</span>
                  <button type="button" className="close" onClick={remove}>&times;</button>
                </h2>
                <h4>Total columns: <span className="text-success">{message[filename].stats.length}</span>, total rows: <span className="text-success">{message[filename].numRows}</span></h4>
                <Griddle 
                  results={message[filename].stats} 
                  resultsPerPage={25} 
                  showFilter={true} 
                  useGriddleStyles={false} 
                  tableClassName={'table table-striped'} />
                  <hr/>
              </div>, 
              div
            )
            console.log(message)

            function remove() {
              $(div).remove()
            }
          })
          // progressBar.parent().addClass('hidden') 
        },
        error: function(request, status, error) {
          console.log('error: ' + error + '\nstatus: ' + status + '\nrequest' + request)
        },
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
      })
    },

    /* 
     * React requires adjacent elements to be wrapped in an enclosing tag
     */
    render: function () {
      return (
        <div>
          <Dropzone className="well" onDrop={this.onDrop} size={"100%"}>
            <div>Upload CSV files here (click or drop).</div>
          </Dropzone>
          <div className="progress hidden">
            <div id="progress-bar" className="progress-bar progress-bar-success progress-bar-striped active">
            0%
            </div>
          </div>
        </div>
      )
    }
})

React.render(<DropzoneDemo />, document.getElementById('dropzone-area'))
