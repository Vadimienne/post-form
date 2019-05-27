import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'styles/TrashCanButton.css'
import img from 'images/trashCan.png'

function Comp (props) {
  return (
    <>
      <div className='trash-can-btn' onClick={props.onClick}/>
    </>
  )
}

export default Comp;
