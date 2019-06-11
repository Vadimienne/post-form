import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/Checkbox.sass'


function Comp (props) {
  return (
    <label className={`checkbox ` + (props.isActive? ' active ': '') + (props.className? props.className : '')} >
      <input className='checkbox-input' type="checkbox" onClick={props.onToggle}/>
      <span className='checkbox-label' >{props.text? props.text: ''}</span>
    </label>
  )
}

export default Comp;
