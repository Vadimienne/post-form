import React, { Component } from "react";
import ReactDOM from "react-dom";

import DragButton from 'components/DragButton';
import Dropzone from 'components/Dropzone';
import Editor from 'components/MyEditor';
import SortDeleteWrapper from 'components/SortDeleteWrapper';
import TrashCanButton from 'components/TrashCanButton';
import IngredientsList from 'components/IngredientsList';
import Ingredient from 'components/IngredientItem'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <form id="article-form">
        <input />
        <Dropzone />
        <Editor onChange={()=>{}}/>
        <IngredientsList onChange={()=>{}}/>
        <Ingredient data={{name:'hi'}}/>
      </form>
    );
  }
}
export default Main;

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;
