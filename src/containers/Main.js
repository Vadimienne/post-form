import React, { Component } from "react";
import { clone } from 'helpers'
import parser from 'helpers/toPostRecipeParser'

import Dropzone from 'components/Dropzone';
import Editor from 'components/MyEditor';
import Steps from 'components/Steps'
import Tags from 'components/Tags'
import IngredientGroups from 'components/IngredientGroups'
import Timings from 'components/Timings'
import Input from 'components/Input'

import SideSubmitColumn from 'components/SideSubmitColumn'
import SideTags from 'components/SideTags'

import 'styles/index.css'
import 'styles/MainMain.sass'
import 'styles/EdimDomaIcons.sass'


import { getRecipe, getUnits, getTags, getContests, createRecipe, updateRecipe } from 'api/requests'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: {},
            tags: {},
        };
        this.stateUpdater = this.stateUpdater.bind(this)
        this.updateIngredients = this.updateIngredients.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    
    // fetch data from the server when app launches
    async componentDidMount(){
        const recipe = await     getRecipe(110258) //createRecipe()
        const tags = await getTags()
        const units = await getUnits()
        const contests = await getContests()
       /*  const newRecipe = await createRecipe()
        console.log(newRecipe) */
        // console.log('PARSER')
        // parser(recipe, tags)
        /* contests
        console.log('contests: ', contests.contests); */
        this.setState({json: recipe})
        this.setState({tags})
        this.setState({units})
        this.setState({contests: contests.contests})
        this.updateIngredients()
    }


    // write group ingredients to state
    // these ingredients will be passed to steps as available ingredients
    updateIngredients(){
        let ingredients = []
        let ingredientGroups = [...this.state.json.ingredient_groups]
        ingredientGroups.map(
            (elem) => ingredients.push({label: elem.element, value: elem.recipe_ingredients})
        )
        this.setState({ingredients})
    }

    componentDidUpdate(prevProps, prevState){
        // update available ingredients when changed
        if (prevState.json.ingredient_groups && (JSON.stringify(prevState.json.ingredient_groups) != JSON.stringify(this.state.json.ingredient_groups))){
            this.updateIngredients()
        }
    }

    // update particular state field with passed value. Optional callback when state update finished
    stateUpdater(field, val, callback){
        let array = clone(this.state.json)
        array[field] = val

        if( field === 'ingredient_groups'){
            console.log('state UPDATER')
            console.log(val[0].recipe_ingredients[0].position)
            console.log(val[0].recipe_ingredients[0])
        }
        //this.setState({json: array}, callback)
        this.state.json = array
        this.forceUpdate()
    }

    // submit form
    onSubmit() {
        updateRecipe(this.state.json.id, parser(this.state.json, this.state.tags))
    }

    render() {
        const { json, units, tags, ingredients, contests } = Object.freeze(clone(this.state))
        console.log('new render')

        const { 
            title,                  image, 
            description,            cooking_time,  
            preparation_time,       servings,
            ingredient_groups,      recipe_steps,
            setting_commentable,    setting_rateable,
            recipe_category,        recipe_cooking_methods,
            recipe_cuisine,         recipe_cuisine_apps,
            recipe_cuisine_types,   recipe_holidays,
            recipe_mealtimes,       recipe_nutrition_types,
            recipe_user_tags,       recipe_subcategories,
            contest,                contest_id,
        } = json

        // because json.id isn't clear enough
        const recipeId = json.id

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
        
        // object describes which fields are filled or empty
        let validation = {
            title: title ? true: false,
            category: recipe_category ? (recipe_category.toString().length? true: false) : false,
            national_cuisine: recipe_cuisine? (recipe_cuisine.toString().length? true: false): false,
            timing: parseInt(cooking_time, 10)? true: false,
            servings: parseInt(servings, 10)? true: false,
            ingredients: this.state.ingredients ? (this.state.ingredients.length? true: false) : false,
            step: recipe_steps ? (recipe_steps.length? true: false) : false,
            steps_description: recipe_steps ? (recipe_steps.find((elem) => elem.body.length === 0)? false: true) : false,
        }
        console.log(Object.values(validation))

        // form is valid when all required fields are filled
        const isFormValid = (
            Object.values(validation).find(elem => elem === false) === false 
            && Object.values(validation).length
        ) ? false: true

        return (
            <>
                { this.state.json && this.state.tags && this.state.units ?
                    (<form id="article-form">
                        <div className='flex-wrapper'>

                            <div className='left-column form-column'>
                                <SideTags 
                                    tags={tags} 
                                    checked={checkedTags} 
                                    contests={contests}
                                    stateUpdater={this.stateUpdater}
                                    isCategoryValid={validation.category}
                                    isCuisineValid={validation.national_cuisine}
                                />
                            </div>

                            <div className='main-column form-column'>
                                <div className='content-box'>
                                    <div className='content-box__content'>
                                        <Input
                                            className=''
                                            onChange={(e)=> this.stateUpdater('title', e.target.value)}
                                            value={title}
                                            isBig
                                            isValid={title ? true : false}
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
                                            recipeId={recipeId}
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

                                <SideSubmitColumn 
                                    settingRateable={setting_rateable} 
                                    settingCommentable={setting_commentable} 
                                    stateUpdater={this.stateUpdater} 
                                    isFormValid={isFormValid} 
                                    onSubmit={this.onSubmit}
                                />

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


