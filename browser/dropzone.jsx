var $ = require('jquery')
var React = require('react')
var Dropzone = require('react-dropzone')

function progressHandlingFunction(e){
    if(e.lengthComputable){
      $('progress').attr({value:e.loaded,max:e.total})
    }
}

var DropzoneDemo = React.createClass({
    onDrop: function (files) {
      console.log('Received files: ', files)
      var formData = new FormData()
      formData.append('mytestfield', 'i will succeed')
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
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
        beforeSend: null,
        success: function(message, status, request) {
          console.log('success: ' + message + '\nstatus: ' + status + '\nrequest' + request)
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
          <Dropzone onDrop={this.onDrop} size={150} >
            <div>Drop CSV files here, or click to select files to upload.</div>
          </Dropzone>
          <progress></progress>
        </div>
      )
    }
})

React.render(<DropzoneDemo />, document.getElementById('dropzone-area'))
