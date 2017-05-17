/**
 * Created by ZE on 2017/05/14.
 */
import React, {Component} from 'react'

import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'

// ...or load this specific CSS file using a <link> tag in your document
import 'react-fine-uploader/gallery/gallery.css'
import * as server from './server'

const uploader = new FineUploaderTraditional({
  options: {
    chunking: {
      enabled: true
    },
    deleteFile: {
      enabled: true,
      endpoint: server.root_url('delete')
    },
    request: {
      endpoint: server.root_url('upload'),
      method: 'POST',
      params: {
        _token: server.token
      }
    },
    retry: {
      enableAuto: false
    },
    callbacks: {
      onSubmit: function (id, name) {
        console.log(id, name)
      },
      onUpload: function (id, name) {
        console.log(id, name)
        this.setParams({_token: server.token()}, id);
      }
    }
  },

})

class UploadComponent extends Component {
  render() {
    return (
        <Gallery uploader={ uploader }/>
    )
  }
}

export default UploadComponent