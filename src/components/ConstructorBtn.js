import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/ConstructorBtn.sass'

function RoundBtn (props) {
  return (
    <button type='button' role='button' tabIndex={0} className={`round-btn + ${props.className}`} onClick={props.onClick}>
      {props.icon && <div className='edimdoma-icon'>{props.icon}</div>}
      <div className='round-btn-text'>{props.text}</div>
    </button>
  )
}

export default RoundBtn;
