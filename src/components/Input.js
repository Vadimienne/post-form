import React, { Component } from "react";
import ReactDOM from "react-dom";

function Comp (props) {
  return (
    <div className='field-container'>
        <input className='text-input' value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
    </div>
  )
}

export default Comp;
