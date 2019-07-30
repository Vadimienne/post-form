import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Main from './containers/Main'
import RecipeSelector from './containers/RecipeSelector';
import ErrorPage from './containers/ErrorPage'

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(
    <Router> 
        <Switch>
            <Route exact path='/:recipeId' component={Main}></Route>
            <Route exact path='/' component={RecipeSelector}></Route>
            <Route component={ErrorPage} />
        </Switch>
    </Router>, wrapper) : false;
