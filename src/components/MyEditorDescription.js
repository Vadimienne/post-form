import React, { Component } from "react";
import ContentEditable from 'react-contenteditable'

import 'styles/MyEditor.sass'

class Editor  extends Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef()
        this.onInput = this.onInput.bind(this)
        this.updateEditorContent = this.updateEditorContent.bind(this)
    }

    shouldComponentUpdate(nextProps){
        if(JSON.stringify(this.props) === JSON.stringify(nextProps)){
            return false
        }
        else {
            return true
        }
    }

    execCommand(cmd, insertion) {
        let val = insertion ? insertion : undefined
        if(cmd.cmd==='createLink') {
            val = prompt('Укажите ссылку: ')
        }
        if (cmd.cmd === 'insertHTML') {
            val = prompt('Вставьте HTML: ')
        }
        document.execCommand(cmd.cmd, false, (val || ''))
    }

    updateEditorContent(){
        const node = this.editorRef.current
        node.innerHTML = this.props.data
    }

    componentDidMount(){
        this.props.data ? this.updateEditorContent() : null
    }

    onInput(){
        const node = this.editorRef.current
        this.props.onChange(node.innerHTML)
    }

    render() {

        return (
            <div
                className={'editor ' + (this.props.data && this.props.data.length ? '' : 'invalid' )}
                onClick={()=>this.editorRef.current.focus()}>
                <span className='toolbox text-toolbox'>Описание</span>

                <ContentEditable
                    className='editor-text'
                    html={this.props.data? this.props.data: ''}
                    onChange={this.onInput}
                    innerRef={this.editorRef}
                />
            </div>
        );
    }
}
export default Editor ;
