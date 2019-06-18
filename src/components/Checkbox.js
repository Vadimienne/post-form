import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/Checkbox.sass'

class Cont extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps){
    if(JSON.stringify(this.props) === JSON.stringify(nextProps)){
      return false
    }
    else {
      return true
    }
  }


  render() {
    return (
      <label className={`checkbox ` + (this.props.isActive? ' active ': '') + (this.props.className? this.props.className : '')} >
        <input className='checkbox-input' type="checkbox" onClick={this.props.onToggle}/>
        <span className='checkbox-label' >{this.props.text? this.props.text: ''}</span>
      </label>
    )
  }
}
export default Cont;
