import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/ExpCheckbox.sass'

function Comp (props) {
  return (
    <label className={`exp-checkbox ` + (props.isActive? 'active': '')} onClick={props.onToggle}>
      <input className='checkbox-input' type="checkbox" />
      <span className='checkbox-label' >{props.text? props.text: ''}</span>
    </label>
  )
}

export default Comp;
