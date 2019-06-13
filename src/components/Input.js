import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/Input.sass'

function Comp (props) {
  return !props.isBig? (
    <div className={props.className}>
      <div className='field-container'>
          <input className='text-input' defaultValue={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            maxLength={props.maxlength}
          />
      </div>
    </div>
  ):
  (  <div className='field-big field-container'>
        <input className='main-column__input_title text-input' defaultValue={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          maxLength={props.maxlength}
        />
    </div>
  )

}

export default Comp;
