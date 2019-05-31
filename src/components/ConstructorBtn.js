import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/ConstructorBtn.css'

function ConstructorBtn (props) {
  return (
    <div role='button' tabIndex={0} className='add-module-btn' onClick={props.onClick}>
      {props.img && <img className='add-module-img' src={props.img} />}
      <div className='add-module-text'>{props.text}</div>
    </div>
  )
}

export default ConstructorBtn;
