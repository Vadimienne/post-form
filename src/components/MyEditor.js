import React, { Component } from "react";
import ContentEditable from 'react-contenteditable'

import {commands} from 'config/execCommands'

import ToolBtn from 'components/EditorToolBtn'

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

    componentDidMount(){
        this.props.data ? this.updateEditorContent() : null
    }

    // update text
    updateEditorContent(){
        const node = this.editorRef.current
        node.innerHTML = this.props.data
    }

    // command executed when buttons (italic, bold, link, etc.) are pressed
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

    // send changes to state
    onInput(){
        const node = this.editorRef.current
        this.props.onChange(node.innerHTML)
    }

    render() {

        // tool list can be found in config/execCommands
        let tools = ['removeFormat', 'insertUnorderedList', 'insertOrderedList']
        // tools = []

        // withdraw needed tools
        let filteredCommands = tools ? tools.map(
            (elem) => commands.hasOwnProperty(elem)? commands[elem]: undefined
        ): []

        // map tool-buttons
        //button below contains class from ToolBtn.sass that resets default button styles
        let mappedCommands = filteredCommands.map(
            (elem) => 
                <button 
                    type='button' 
                    className={"icon-tool-btn fas fa-" + elem.icon} 
                    key={elem.cmd} 
                    onClick={()=>{this.execCommand(elem)}}
                />
        )

        // buttons for inserting characters
        let insertions = [
            {text:'«', name: 'guillemet-left'},
            {text:'»', name:'guillemet-right'},
            {text: '—', name: 'long-dash'},
            {text: '–', name: 'dash'},
            {text: '°C', name: 'celsius'}
        ]
        insertions = []

        let mappedInsertions = insertions.map(
            (elem) => 
                <ToolBtn 
                    cmd={elem.name} 
                    key={elem.name} 
                    onClick={()=>this.execCommand({cmd:'insertText'}, elem.text)}
                />
        )

        return (
            <div className='editor'>
                <div className='toolbox'>{mappedCommands}{mappedInsertions}</div>

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
