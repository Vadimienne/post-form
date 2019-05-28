import React, { Component } from "react";
import ReactDOM from "react-dom";

import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import DragButton from 'components/DragButton';
import Dropzone from 'components/Dropzone';
import Editor from 'components/MyEditor';
import SortDeleteWrapper from 'components/SortDeleteWrapper';
import TrashCanButton from 'components/TrashCanButton';
import IngredientList from 'components/IngredientList';
import Ingredient from 'components/IngredientItem'
import Step from 'components/Step'
import Steps from 'components/Steps'
import Tags from 'components/Tags'
import IngredientGroups from 'components/IngredientGroups'
import Timings from 'components/Timings'

import 'styles/Main.sass'


const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {
        title: 'Recipe',
        titlePic: {url:'https://pbs.twimg.com/profile_images/956981887687380993/RFfhvjkm_400x400.jpg'},
        titleDescription: 'hi my name is hi my name is hi my name is',
        timeInfo: {
          hours: '1',
          minutes: '45',
          portions: '3',
          preparationHours: '0',
          preparationMinutes: '0',
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
            image: {url:'https://i.redd.it/flnarodfujvz.jpg'},
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
            image: {url:'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'},
            description: 'hi',
            ingredients: [
              {
                name: 'ken',
                quantity: '1',
                metric: 'г'
              },
            ]
          },
        ],
        tags: ['bolognese','chicken']

      }
    };
  }

  stateUpdater(field, val){
    let array = this.state.json
    array[field] = val
    this.setState({json: array})
  }

  render() {
    const { title, titlePic, titleDescription, timeInfo, ingredientGroups, steps, tags } = this.state.json

    console.log(this.state.json.timeInfo)
    return (
      <form id="article-form">
        <input onChange={(e)=> this.stateUpdater('title', e.target.value)} defaultValue={title}/>
        <Dropzone data={titlePic} onChange={(val)=> this.stateUpdater('titlePic', val)} />
        <Editor data={titleDescription} onChange={(val)=>{this.stateUpdater('titleDescription',val)}}/>
        <Timings data={timeInfo} onChange={(val) => this.stateUpdater('timeInfo', val)} />
        <IngredientGroups data={ingredientGroups} onChange={(val)=>this.stateUpdater('ingredientGroups',val)} />
        <Steps data={steps} onChange={(val) => this.stateUpdater('steps', val)}/>
        <Tags data={tags} onChange={(val) => this.stateUpdater('tags', val)}/>
      </form>
    );
  }
}
export default Main;

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;
