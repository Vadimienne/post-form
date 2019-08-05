import React, { PureComponent } from 'react'
import 'styles/Dropzone.sass'

import { postImage, postImageStep, postImageCreatingStep } from 'api/requests'
import UploadImage from 'images/upload-image.png'
import Svg from 'components/Svg'

class Dropzone extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hightlight: false,
            selectedImg:''}

        this.fileInputRef = React.createRef()
        this.defaultImg = "https://www.jvlife.ru/assets/placeholders/bigimage-829a77075b45bf3a762f9e7b9a39781d78fd0c73803c58ec6936000573179599.png"
        this.onDragOver = this.onDragOver.bind(this)
        this.openFileDialog = this.openFileDialog.bind(this)
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }

    openFileDialog() {
        if (this.props.disabled) return
        this.fileInputRef.current.click()
    }

    async onFilesAdded(evt) {
        if (this.props.disabled) return
        const files = evt.target.files

        

        if (this.props.fetchPath === 'recipe[image]'){
            let response = await postImage(this.props.recipeId, files[0])
            this.props.stateUpdater(['image'], response.image)
        }
        else {

            console.log('HELLO HELLO AHAHAH:', this.props.stepId)
            if (this.props.stepId){
                let response = await postImageStep(this.props.recipeId, this.props.stepId, files[0])
                let imageUrl = `${response.image}?${Math.floor(Math.random() * Math.floor(99999))}`
                this.props.stateUpdater(['recipe_steps', this.props.stepIndex, 'image'], imageUrl)
            }
            else{
                let data = {
                    image: files[0],
                    body: this.props.body,
                    position: parseInt(this.props.stepIndex, 10) + 1,
                    recipe_id: this.props.recipeId
                }
                let response = await postImageCreatingStep(this.props.recipeId, data)
                let imageUrl = `${response.image}?${Math.floor(Math.random() * Math.floor(99999))}`
                this.props.stateUpdater(['recipe_steps', this.props.stepIndex, 'image'], imageUrl)
            }
        }

    }

    onDragOver(evt) {
        evt.preventDefault()
    }

    async onDrop(event) {
        event.preventDefault()

        if (this.props.disabled) return

        const files = event.dataTransfer.files

        let response = await postImage(this.props.recipeId, files[0], this.props.fetchPath)

        this.props.stateUpdater(this.props.updatePath, response.image)
    }

    render() {

        const url = this.props.data
        

        return (
            <div
                className={`Dropzone ${this.state.hightlight ? 'Highlight ' : ''} ${url ? ' uploaded' : ''}`}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onClick={this.openFileDialog}
                url={url}
                style={{ 
                    cursor: this.props.disabled ? 'default' : 'pointer', 
                    backgroundImage: url ? `url(${url})`: '',
                    height: this.props.height? this.props.height : '340px'
                }}
            >
                {!url?
                    <span className='Dropzone__upload-description'>Загрузите фотографию</span> : undefined
                }
                
                
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    onChange={this.onFilesAdded}
                />
            </div>
        )
    }
}

export default Dropzone
