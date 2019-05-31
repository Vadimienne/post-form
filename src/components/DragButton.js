import React, { Component } from "react";
import ReactDOM from "react-dom";
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';

import 'styles/DragButton.css'
import img from 'images/drag.png'

function Comp (props) {
  return (
    <>
      <div role='button' tabIndex={0} className='icon'/>
    </>
  )
}

export default sortableHandle(Comp);
