import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Main from './containers/Main'
import RecipeSelector from './components/RecipeSelector';

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(
    <Router> 
        <Route path='/:recipeId' component={Main}></Route>
        <Route exact path='/' component={RecipeSelector}></Route>
    </Router>, wrapper) : false;
