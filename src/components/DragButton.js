import React, { Component } from "react";
import ReactDOM from "react-dom";
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';

import 'styles/DragButton.css'
import img from 'images/drag.png'

//sorting via keyboard doesn't work with <button>

function Comp (props) {
  return (
    <>
      <div role='button' tabIndex={0} >⣿</div>
    </>
  )
}

export default sortableHandle(Comp);
