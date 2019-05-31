import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/Checkbox.sass'

function Comp (props) {
  return (
    <div className={`checkbox ` + (props.isActive? 'active': '')} onClick={props.onToggle}>
      <input className='checkbox-input' type="checkbox" />
      <label className='checkbox-label' >{props.text? props.text: ''}</label>
    </div>
  )
}

export default Comp;
