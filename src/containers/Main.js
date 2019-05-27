import React, { Component } from "react";
import ReactDOM from "react-dom";

import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import DragButton from 'components/DragButton';
import Dropzone from 'components/Dropzone';
import Editor from 'components/MyEditor';
import SortDeleteWrapper from 'components/SortDeleteWrapper';
import TrashCanButton from 'components/TrashCanButton';
import IngredientsList from 'components/IngredientsList';
import Ingredient from 'components/IngredientItem'


const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {
        title: 'Recipe',
        titlePic: 'https://pbs.twimg.com/profile_images/956981887687380993/RFfhvjkm_400x400.jpg',
        titleDescription: 'hi my name is hi my name is hi my name is',
        timeInfo: {
          hours: 1,
          minutes: 45,
          portions: 3,
          preparationHours: 0,
          preparationMinutes: 15,
        },
        ingredientGroups:[
          {
            groupName:'Primary',
            ingredients:[
              {
                name: 'Chicken',
                quantity: '2',
                metric: 'шт.'
              }
            ]
          }
        ],
        steps: [
          {
            image: 'https://i.redd.it/flnarodfujvz.jpg',
            description: 'hi hello privet',
            ingredients: [
              {
                name: 'Chicken',
                quantity: '2',
                metric: 'шт.'
              },
            ]
          },
          {
            image: 'https://i.redd.it/flnarodfujvz.jpg',
            description: 'hi hello privet',
            ingredients: [
              {
                name: 'Chicken',
                quantity: '2',
                metric: 'шт.'
              },
            ]
          },
        ],
        tags: ['bolognese','chicken']

      }
    };

    this.createStep = this.createStep.bind(this)
    this.removeStep = this.removeStep.bind(this)
  }

  createStep() {
  let array = this.state.json
  array.steps.push({image:'', description:'', ingredinets:[]})
  this.setState({json: array})
  }

  removeStep(stepIndex) {
    let array = this.state.json
    array.steps.splice(stepIndex, 1)
    this.setState({json: array})
  }

  stateUpdater(field, val){
    let array = this.state.json
    array[field] = val
    this.setState({json: array})
  }

  render() {
    console.log(this.state.json)
    return (
      <form id="article-form">
        <input onChange={(e)=> this.stateUpdater('title', e.target.value)} defaultValue={this.state.json.title}/>
        <Dropzone onChange={(val)=> this.stateUpdater('titlePic', val)} />
        <Editor onChange={(val)=>{this.stateUpdater('titleDescription',val)}}/>
        <IngredientsList onChange={()=>{}}/>
        <button type='button' onClick={()=>this.createStep(1)} />
      </form>
    );
  }
}
export default Main;

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;
