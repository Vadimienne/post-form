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
    let ingredient_groups = [...this.state.json.ingredient_groups]
    ingredient_groups.map(
      (elem) => //ingredients.push({label: elem.element, value: elem.recipe_ingredients})

       elem.recipe_ingredients.map(
        (ingredient) => ingredients.push(ingredient)
      )
    )
    this.setState({ingredients})
  }

  componentDidUpdate(prevProps, prevState){
    console.log('prev',prevState.json.ingredient_groups)
    console.log('curr',this.state.json.ingredient_groups)
    if (prevState && this.state && prevState.json.ingredient_groups
      && (prevState.json.ingredient_groups.toString() !== this.state.json.ingredient_groups.toString())){
        console.log('UPD')
        this.updateIngredients()
    }
  }

  // isFormValid(){
  //   let values = Object.values(this.state.validation)
  //   return !values.includes(false)
  // }

  stateUpdater(field, val){
    let array = {...this.state.json}
    array[field] = val
    this.setState({json: array})
  }

  // let array = {...this.state.json}
  // //array[field] = val
  // this.setState((prevState, props) => {return {json: Object.defineProperty(array, field, val)}})

  render() {
    const { json, units, tags, ingredients } = this.state

    const { title, image, description, cooking_time, preparation_time, servings,
      ingredient_groups, recipe_steps,
      setting_commentable, setting_rateable,
      recipe_category, recipe_cooking_methods,
      recipe_cuisine, recipe_cuisine_apps,
      recipe_cuisine_types, recipe_holidays,
      recipe_mealtimes, recipe_nutrition_types,
      recipe_user_tags, recipe_subcategories,
      contest, contest_id} = json

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
      contest:                contest,
      contest_id:             contest_id
    }


    //this.isFormValid()

    let validation =  {}
    if( title && this.state.ingredients ){
      validation = {
        title: title.length? true: false,
        category: recipe_category.toString().length? true: false,
        national_cuisine: recipe_cuisine.toString().length? true: false,
        timing: parseInt(cooking_time)? true: false,
        servings: parseInt(servings)? true: false,
        ingredients: this.state.ingredients.length? true: false,
        step: recipe_steps.length? true: false,
        steps_description: recipe_steps.find((elem) => elem.body.length === 0)? false: true,
      }
    }
    let isFormValid = (Object.values(validation).find(elem => elem === false) === false && Object.values(validation).length)? false: true
    // console.log('1')
    // console.log(Object.values(validation).find(elem => elem === false))
    // console.log('2')
    //
    //
    // console.log(Object.values(validation))
    // console.log('isValid',isFormValid)

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
                <SideTags tags={tags} checked={checkedTags} stateUpdater={this.stateUpdater}
                  isCategoryValid={validation.category}
                  isCuisineValid={validation.national_cuisine}
                />
          </div>

          <div className='main-column form-column'>
            <div className='content-box'>
              <div className='content-box__content'>
                  <Input
                    className={''}
                    onChange={(e)=> this.stateUpdater('title', e.target.value)}
                    value={title}
                    isBig
                    isValid={title.length}
                    placeholder='Введите название рецепта'
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
                  isValid={validation.timing}
                  isServingsValid={validation.servings}
                  data={{cooking_time: cooking_time, preparation_time: preparation_time, servings: servings}}
                  onTimeChange={(val) => this.stateUpdater('cooking_time', val)}
                  onPrepTimeChange={(val) => this.stateUpdater('preparation_time', val)}
                  onServingsChange={(val) => this.stateUpdater('servings', val)}
                />

              </div>

              <div className='content-box__content_ingredients'>
                <IngredientGroups
                  isValid={validation.ingredients}
                  data={ingredient_groups}
                  units={units}
                  onChange={(val)=>this.stateUpdater('ingredient_groups',val)}
                />
              </div>

            </div>
            <Steps
              isValid={validation.step}
              data={recipe_steps}
              ingredientsAvailable={ingredients}
              units={units}
              onChange={(val) => this.stateUpdater('recipe_steps', val)}
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
