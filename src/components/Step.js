import React, { Component } from "react";
import ReactDOM from "react-dom";

import Dropzone from 'components/Dropzone'
import Editor from 'components/MyEditorDescription'
import IngredientList from 'components/IngredientList'

import 'styles/Step.sass'

class Step extends Component {
  constructor(props) {
    super(props);
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  onFieldChange(field, val) {
    let data = this.props.data
    data[field] = val
    this.props.onChange(data)
  }

  render() {
    const { image, description, ingredients } = this.props.data
    return (
      <div className='step-presentational'>
        <Dropzone onChange={(val) => this.onFieldChange('image', val)} data={image}/>
        <div className='content-box__content' >
          <span>Описание</span>
          <Editor onChange={(val) => this.onFieldChange('description', val)} data = {description}/>
          <span>Ингредиенты</span>
          <IngredientList onChange={(val) => this.onFieldChange('ingredients', val)} data= {ingredients}/>
        </div>
      </div>
    );
  }
}
export default Step;
