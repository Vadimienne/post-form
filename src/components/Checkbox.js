import React, { PureComponent } from "react";

import 'styles/Checkbox.sass'

class Cont extends PureComponent {
    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this)
    }

    /* shouldComponentUpdate(nextProps){
        if(JSON.stringify(this.props) === JSON.stringify(nextProps)){
            return false
        }
        else {
            return true
        }
    } */

    onToggle(){
        this.props.stateUpdater(this.props.elemId, this.props.isActive)
    }


    render() {
        return (
            <label className={`checkbox ` + (this.props.isActive? ' active ': '') + (this.props.className? this.props.className : '')} >
                <input className='checkbox-input' type="checkbox" onClick={this.onToggle}/>
                <span className='checkbox-label' >{this.props.text? this.props.text: ''}</span>
            </label>
        )
    }
}
export default Cont;
