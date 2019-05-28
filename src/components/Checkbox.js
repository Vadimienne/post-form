import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/Checkbox.sass'

function Comp (props) {
  return (
    <>
      <label className={`checkbox-container ` + (props.isActive? 'active': '')}>{props.text? props.text: ''}
        <input type="checkbox" onClick={props.onToggle}/>
        <span className="checkbox-checkmark"></span>
      </label>
    </>
  )
}

export default Comp;
