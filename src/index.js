import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Main from './containers/Main'

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(<Router> <Route path='/:recipeId?' component={Main}></Route></Router>, wrapper) : false;
