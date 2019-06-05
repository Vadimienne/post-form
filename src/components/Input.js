import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/Input.sass'

function Comp (props) {
  return (
    <div className='field-container'>
        <input className='text-input' value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          maxLength={props.maxlength}
        />
    </div>
  )
}

export default Comp;
