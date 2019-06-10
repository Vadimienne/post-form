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
import CollapsibleCheckboxes from 'components/CollapsibleCheckboxes'
import ConstructorBtn from 'components/ConstructorBtn'
import Input from 'components/Input'
import Check from 'components/ExpCheckbox'

import SwitchSlider from 'components/SwitchSlider'

import 'styles/index.css'
//import 'styles/Main.sass'
import 'styles/MainMain.sass'
import 'styles/EdimDomaIcons.sass'



const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {
        title: 'Recipe',
        image: 'https://pbs.twimg.com/profile_images/956981887687380993/RFfhvjkm_400x400.jpg',
        description: 'hi my name is hi my name is hi my name is',
        servings: 3,
        cooking_time: 105,
        preparation_time: 0,
        ingredient_groups:[
          {
            title:'Primary',
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
            description: '',
            ingredients: [
              {
                name: 'Chicken',
                quantity: '2',
                metric: 'шт.'
              },
            ]
          },
          {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
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
        tags: ['bolognese','chicken'],
        checkboxes:{
          head:'Методы приготовления',
          boxes: [
            {name: 'взбивать', isChecked: true},
            {name: 'варить, тушить', isChecked: true},
            {name: 'гриль, мангал', isChecked: false},
            {name: 'замораживать, охлаждать', isChecked: false},
            {name: 'фритюр', isChecked: true},
          ]
        }

      },
      validation: {
        title: true,
        category: true,
        national_cuisine: true,
        timing: true,
        ingredient: true,
        step: true,
        steps_description: true,
      }
    };
    this.stateUpdater = this.stateUpdater.bind(this)
    //this.isFormValid = this.isFormValid.bind(this)
  }

  // isFormValid(){
  //   let values = Object.values(this.state.validation)
  //   return !values.includes(false)
  // }

  validationUpdater(field, value){
    let obj = this.state.validation
    obj[field] = value
    this.setState({validation: obj})
  }

  stateUpdater(field, val){
    let array = this.state.json
    array[field] = val
    this.setState({json: array})
  }

  render() {
    const { title, image, description, cooking_time, preparation_time, servings, ingredient_groups, steps, tags } = this.state.json

    let isFormValid = 0//this.isFormValid()

    console.log(this.state.json)
    return (
      <form id="article-form">
        <div className='flex-wrapper'>

          <div className='left-column form-column'>
            <div className='content-box'>
              <div className='content-box__content'>
                <CollapsibleCheckboxes
                  data={this.state.json.checkboxes}
                  onChange={(val)=> this.stateUpdater('checkboxes', val)}
                />
              </div>
            </div>
          </div>

          <div className='main-column form-column'>
            <div className='content-box'>
              <div className='content-box__content'>
                  <Input
                    className='main-column__input_title text-input '
                    onChange={(e)=> this.stateUpdater('title', e.target.value)}
                    defaultValue={title}
                    isBig
                    validation={(val)=>this.validationUpdater('title', val)}
                  />
              </div>

              <Dropzone
                data={image}
                onChange={(val)=> this.stateUpdater('image', val)}
              />

              <div className='content-box__content'>
                <Editor
                  data={description}
                  onChange={(val)=>{this.stateUpdater('description',val)}}
                />

                <Timings
                  data={{cooking_time: cooking_time, preparation_time: preparation_time, servings: servings}}
                  onTimeChange={(val) => this.stateUpdater('cooking_time', val)}
                  onPrepTimeChange={(val) => this.stateUpdater('preparation_time', val)}
                  onServingsChange={(val) => this.stateUpdater('servings', val)}
                />

              </div>

              <div className='content-box__content_ingredients'>
                <IngredientGroups
                  data={ingredient_groups}
                  onChange={(val)=>this.stateUpdater('ingredientGroups',val)}
                />
              </div>

            </div>
            <Steps
              data={steps}
              onChange={(val) => this.stateUpdater('steps', val)}
            />
            <Tags data={tags} onChange={(val) => this.stateUpdater('tags', val)}/>
          </div>
          <div className="right-column form-column">

            <div className='content-box'>
              <div className='instruction'>
                <span>В первый раз на сайте или забыли, как пользоваться формой создания рецепта? Тогда посмотрите инструкцию.</span>
                <div className='separation-line'></div>
                <ConstructorBtn className='submit-btn' text='инструкция' isActive/>
              </div>
            </div>

            <div className='content-box'>
              <div className='preview'>
                <div className='slider-container'>
                  <span className='toggle-label'>Включен</span>
                  <SwitchSlider />
                  <span className='toggle-label'>Выключен</span>
                </div>
                <span className='preview-label'>Предварительный просмотр</span>
                <div className='separation-line'></div>
                <ConstructorBtn className='draft-btn' text="В ЧЕРНОВИК" icon='&#xea22;' />
                <span className='draft-label'>Если Вы не готовы выложить рецепт, хотите его дополнить позже, сохраните черновик.</span>
              </div>
            </div>

            <div className="content-box">
              <div className='publish'>
                <Check isActive={true} text='Получать комментарии и оценки от пользователей' />
                <Check isActive={false} text='Участвует в голосовании?' />
                <div className='separation-line'></div>
                <ConstructorBtn className='submit-btn' text='опубликовать' isActive={isFormValid}/>
                <span className='publish-label'>Рецепт будет опубликован после прохождения модерации. Время модерации с 9 до 21 по Москве.</span>
              </div>
            </div>

          </div>
        </div>
      </form>
    );
  }
}
export default Main;

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;
