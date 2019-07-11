import React, { PureComponent } from "react";

import Check from 'components/Checkbox'

import 'styles/CollapsibleCheckboxes.sass'

class CollapsibleCheckboxes extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {isOpen:true}
        this.toggleCheck = this.toggleCheck.bind(this)
    }

    // send checkbox toggles to state
    toggleCheck(id, isActive){
        let array = this.props.checked
        let newArray
        isActive?
            newArray = array.delete(array.indexOf(id))
            : newArray = array.push( id )

        this.props.stateUpdater([this.props.updatePath], newArray)
    }
    

    render() {
        const { head, tags, checked } = this.props

        // map checkboxes
        let checkboxes = tags.map((elem, index) => {
            let isChecked = checked.includes(elem.id)? true: false
            return(
                <Check 
                    key={'checkbox-'+index} 
                    isActive={isChecked} 
                    text={elem.name} 
                    onToggle={this.toggleCheck}
                    elemId={elem.id}
                    stateUpdater={this.toggleCheck}
                />
            )
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
