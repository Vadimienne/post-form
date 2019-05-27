import React, { Component } from "react";
import ReactDOM from "react-dom";

import 'styles/ToolBtn.sass'

function ToolBtn (props) {
  return (
    <>
      <button type='button' href='#' className={'icon-tool-btn icon-tool-btn-'+props.cmd} onClick={(e)=>props.onClick(e)}/>
    </>
  )
}

export default ToolBtn;
