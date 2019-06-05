import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'styles/TrashCanButton.css'
import img from 'images/trashCan.png'

function Comp (props) {
  return (
    <>
      <button type='button' role='button' tabIndex={0} className='trash-can-btn edimdoma-icons-trashcan' onClick={props.onClick}>&#xea5a;</button>
    </>
  )
}

export default Comp;
