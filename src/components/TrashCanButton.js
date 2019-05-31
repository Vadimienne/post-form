import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'styles/TrashCanButton.css'
import img from 'images/trashCan.png'

function Comp (props) {
  return (
    <>
      <div role='button' tabIndex={0} className='trash-can-btn' onClick={props.onClick}/>
    </>
  )
}

export default Comp;
