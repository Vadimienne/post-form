import React, { Component } from 'react'
import 'styles/Dropzone.sass'

// function postPic (url, file) {
//   if( url && file ) {
//     return fetch (url, {method: 'POST', body: file})
//     .then (response => response.url)
//     .catch((e) => console.log(e))
//   }
//   return ''
// }

// sample

function postPic () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Flag_of_Papua_New_Guinea.svg/1200px-Flag_of_Papua_New_Guinea.svg.png');
    }, 2000);
  });
}

class Dropzone extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hightlight: false,
      selectedImg:''}

    this.fileInputRef = React.createRef()
    this.defaultImg = "https://www.jvlife.ru/assets/placeholders/bigimage-829a77075b45bf3a762f9e7b9a39781d78fd0c73803c58ec6936000573179599.png"

    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  openFileDialog() {
    if (this.props.disabled) return
    this.fileInputRef.current.click()
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return
    const files = evt.target.files

    //could be used to preview pic without waiting for server responses

    // var file = files[0];
    // var reader  = new FileReader();
    // reader.onload = (e) =>  {
    //     // var image = document.createElement("img");
    //     // image.src = e.target.result;
    //     this.setState({selectedImg: e.target.result})
    //     // document.body.appendChild(image);
    //  }
    //  reader.readAsDataURL(file);

    let getUrl = () => {
      return postPic().then((resolve) =>this.props.onChange({url:resolve}))
    }
    getUrl()

    // this.props.stateUpdater(getUrl())

    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
  }

  onDragOver(evt) {
    evt.preventDefault()

    if (this.props.disabled) return

    this.setState({ hightlight: true })
  }

  onDragLeave() {
    this.setState({ hightlight: false })
  }

  onDrop(event) {
    event.preventDefault()

    if (this.props.disabled) return

    const files = event.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
    this.setState({ hightlight: false })
  }

  fileListToArray(list) {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  render() {

    let url = ''
    if(this.props.data) {
      url=this.props.data.url
    }

    return (
      <div
        className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}
          ${url.length? 'uploaded':''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? 'default' : 'pointer',
          backgroundImage: 'url(' + ( url.length ? url: this.defaultImg ) + ')'}}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />

      {/*<label className="uploader__button js-image-label" for="y5aeeeu7c7e"><div className="icon"></div></label>*/}
        <span></span>
      </div>
    )
  }
}

export default Dropzone
