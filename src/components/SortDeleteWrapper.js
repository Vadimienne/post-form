import React, { Component } from "react";
import ReactDOM from "react-dom";
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';

import DragButton from 'components/DragButton'
import TrashCanButton from 'components/TrashCanButton'

import 'styles/SortDeleteWrapper.css'


function SortDeleteWrapper (props) {
  return (
    <>
    <div key={props.key} className={'sort-delete-wrapper '+props.className}>

      <div className='block-managment'>
        <DragButton/>
        <div className='module-name'>{props.name}</div>
        <TrashCanButton onClick={props.onDelete}/>
      </div>
      <div className='module'>{props.children}</div>
    </div>
    </>
  )
}

export default sortableElement(SortDeleteWrapper);
