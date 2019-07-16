import React, { PureComponent } from "react";
import ContentEditable from 'react-contenteditable'

import 'styles/MyEditor.sass'

class Editor  extends PureComponent {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef()
        this.onChange = this.onChange.bind(this)
        this.focusEditor = this.focusEditor.bind(this)
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

    onChange(e){
        this.props.stateUpdater(['recipe_steps', this.props.stepIndex, 'body'], e.target.value)
    }

    focusEditor(){
        this.editorRef.current.focus()
    }

    render() {
        return (
            <div
                className={'editor ' + (this.props.data && this.props.data.length ? '' : 'invalid' )}
                onClick={this.focusEditor}>
                <span className='toolbox text-toolbox'>Описание</span>

                <ContentEditable
                    className='editor-text'
                    html={this.props.data? this.props.data: ''}
                    onChange={this.onChange}
                    innerRef={this.editorRef}
                />
            </div>
        );
    }
}
export default Editor ;
