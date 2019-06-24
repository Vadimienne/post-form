import React, { Component } from "react";
import { clone } from 'helpers'

import Check from 'components/Checkbox'

import 'styles/CollapsibleCheckboxes.sass'

class CollapsibleCheckboxes extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen:true}
    }

    toggleCheck(id, isChecked){
        let array = clone(this.props.checked)
        if (isChecked){
            array.splice(array.indexOf(id), 1)
        }
        else {
            array.push(id)
        }
        this.props.onChange(array)
    }

    render() {
        const { head, tags, checked } = this.props

        let checkboxes = tags.map((elem, index) => {
            let isChecked = checked.includes(elem.id)? true: false
            return(
                <Check key={'checkbox-'+index} isActive={isChecked} text={elem.name} onToggle={()=> this.toggleCheck(elem.id, isChecked)}/>)
        })

        return (
            <div className='checkboxes-component'>
                <span className={"list-name" + (this.state.isOpen? '': ' closed')} onClick={() => this.setState({isOpen: !this.state.isOpen})}>{head}</span>
                <div className={'checkboxes-list ' + (this.state.isOpen? '': ' closed')}>
                    {checkboxes}
                </div>
            </div>
        );
    }
}
export default CollapsibleCheckboxes;
