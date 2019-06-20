import React from 'react'
import ReactDOM from 'react-dom'
import Main from './containers/Main'

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;
