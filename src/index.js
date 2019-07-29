import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Main from './containers/Main'
import RecipeSelector from './containers/RecipeSelector';
import NotFound from './containers/NotFound'

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(
    <Router> 
        <Switch>
            <Route exact path='/:recipeId' component={Main}></Route>
            <Route exact path='/' component={RecipeSelector}></Route>
            <Route exact path='/notfound' component={NotFound} />
        </Switch>
    </Router>, wrapper) : false;
