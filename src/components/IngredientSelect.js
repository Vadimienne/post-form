import React, { Component } from "react";
import ReactDOM from "react-dom";

import {requestIngredients} from 'api/requests'

import AsyncSelect from 'react-select/async'



class IngredientSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen:true}
  }

  async loadOptions(str){
    let response = await requestIngredients(str)
    let options = response.map((elem) => ({value: elem.id, label: elem.name}))
    return options
  }

  render() {

    return (
      <>
        <AsyncSelect loadOptions={(str)=>this.loadOptions(str)} cacheOptions defaultOptions/>
      </>
    );
  }
}
export default IngredientSelect;
