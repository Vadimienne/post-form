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
import Check from 'components/Checkbox'

import SideTags from 'components/SideTags'

import SwitchSlider from 'components/SwitchSlider'

import 'styles/index.css'
//import 'styles/Main.sass'
import 'styles/MainMain.sass'
import 'styles/EdimDomaIcons.sass'


import { getRecipe, getUnits, getTags } from 'api/requests'



const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      tags: {},
      validation: {
        title: true,
        category: true,
        national_cuisine: true,
        timing: true,
        ingredient: true,
        step: true,
        steps_description: true,
      },

    };
    this.stateUpdater = this.stateUpdater.bind(this)
    this.updateIngredients = this.updateIngredients.bind(this)
    //this.isFormValid = this.isFormValid.bind(this)
  }

  async componentDidMount(){
    let recipe = await getRecipe(128237)
    let tags = await getTags()
    let units = await getUnits()
    this.setState({json: recipe})
    this.setState({tags})
    this.setState({units})
    this.updateIngredients()
  }

  updateIngredients(){
    let ingredients = []
    this.state.json.ingredient_groups.map(
      (elem) => elem.recipe_ingredients.map(
        (ingredient) => ingredients.push(ingredient)
      )
    )
    this.setState({ingredients})
  }

  componentDidUpdate(prevProps, prevState){
    if (!Object.keys(prevState.json).length ||
      ((prevState.json.ingredient_groups.toString() !== this.state.json.ingredient_groups.toString())
      && Object.keys(prevState.json).length
      && Object.keys(this.state.json).length)){
        this.updateIngredients()
    }
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
    const { json, units, tags, ingredients } = this.state

    const { title, image, description, cooking_time, preparation_time, servings,
      ingredient_groups, recipe_steps,
      setting_commentable, setting_rateable,
      recipe_category, recipe_cooking_methods,
      recipe_cuisine, recipe_cuisine_apps,
      recipe_cuisine_types, recipe_holidays,
      recipe_mealtimes, recipe_nutrition_types,
      recipe_user_tags, recipe_subcategories} = json

    const checkedTags = {
      recipe_category:        recipe_category,
      recipe_subcategories:   recipe_subcategories,
      recipe_cooking_methods: recipe_cooking_methods,
      recipe_cuisine:         recipe_cuisine,
      recipe_cuisine_apps:    recipe_cuisine_apps,
      recipe_cuisine_types:   recipe_cuisine_types,
      recipe_holidays:        recipe_holidays,
      recipe_mealtimes:       recipe_mealtimes,
      recipe_nutrition_types: recipe_nutrition_types,
      recipe_user_tags:       recipe_user_tags,
    }


    let isFormValid = 0//this.isFormValid()

    //console.log(this.state.json.ingredient_groups[0].recipe_ingredients[0].ingredient)
    //console.log(this.state.json)
    return (
      <>
      { this.state.json && this.state.tags && this.state.units ?
      (<form id="article-form">
        <div className='flex-wrapper'>

          <div className='left-column form-column'>
                {/*<CollapsibleCheckboxes
                  data={this.state.json.checkboxes}
                  onChange={(val)=> this.stateUpdater('checkboxes', val)}
                />*/}
                <SideTags tags={tags} checked={checkedTags} stateUpdater={this.stateUpdater}/>
          </div>

          <div className='main-column form-column'>
            <div className='content-box'>
              <div className='content-box__content'>
                  <Input
                    className='main-column__input_title text-input '
                    onChange={(e)=> this.stateUpdater('title', e.target.value)}
                    value={title}
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
                  units={units}
                  onChange={(val)=>this.stateUpdater('ingredient_groups',val)}
                />
              </div>

            </div>
            <Steps
              data={recipe_steps}
              ingredientsAvailable={ingredients}
              units={units}
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
                <div className='checkboxes'>
                  <Check className='bold-label' isActive={setting_commentable}
                    text='Получать комментарии и оценки от пользователей'
                    onToggle={() => this.stateUpdater('setting_commentable', !setting_commentable)}
                  />
                  <Check className='bold-label' isActive={setting_rateable}
                    text='Участвует в голосовании?'
                    onToggle={() => this.stateUpdater('setting_rateable', !setting_rateable)}
                  />
                </div>
                <div className='separation-line'></div>
                <div className='publish-button'>
                  <ConstructorBtn className='submit-btn' text='опубликовать' isActive={isFormValid}/>
                  <span className='publish-button__label'>Рецепт будет опубликован после прохождения модерации. Время модерации с 9 до 21 по Москве.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>):
        (<div>loading..</div>)
      }
      </>
    );
  }
}
export default Main;

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;
