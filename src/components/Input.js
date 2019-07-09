import React from "react";

import 'styles/Input.sass'

class Input extends React.PureComponent {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        this.props.stateUpdater(this.props.updatePath, e.target.value)
    }

    render(){
        const props = this.props
        // big Input field has a html-structure different from default input field
        return !props.isBig? (
            <div className={props.className}>
                <div className='field-container'>
                    <input
                        className='text-input' 
                        defaultValue={props.value}
                        onChange={this.onChange}
                        placeholder={props.placeholder}
                        maxLength={props.maxlength}
                    />
                </div>
            </div>
        ):
            (  <div className={'field-big field-container ' + props.className + (props.isValid? '': ' invalid')}>
                <input
                    className={'main-column__input_title text-input'} defaultValue={props.value}
                    onChange={this.onChange}
                    placeholder={props.placeholder}
                    maxLength={props.maxlength}
                />
            </div>
            )
    }

}

export default Input;
