import React, { PureComponent } from "react";
import parser from 'helpers/toPostRecipeParser'
import Immutable, { fromJS } from 'immutable'

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
const titleUpdatePath = ['title']

import { getRecipe, getUnits, getTags, getContests, createRecipe, updateRecipe } from 'api/requests'
import { sortSortable } from 'helpers'


class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            json: {},
            tags: {},
        };
        this.stateUpdater = this.stateUpdater.bind(this)
        this.updateIngredients = this.updateIngredients.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onTitleInput = this.onTitleInput.bind(this)
    }

    
    // fetch data from the server when app launches
    async componentDidMount(){
        let recipe = await getRecipe(110258) //createRecipe()
        const tags = await getTags()
        const units = await getUnits()
        const contests = await getContests()

        recipe = sortSortable(recipe)
        /*  const newRecipe = await createRecipe()
        console.log(newRecipe) */
        // console.log('PARSER')
        // parser(recipe, tags)
        /* contests
        console.log('contests: ', contests.contests); */
        this.setState({json: fromJS(recipe)})
        this.setState({tags})
        this.setState({units})
        this.setState({contests: contests.contests})
        this.updateIngredients()
    }


    // write group ingredients to state
    // these ingredients will be passed to steps as available ingredients
    updateIngredients(){
        let ingredients = Immutable.List()
        let ingredientGroups = this.state.json.get('ingredient_groups')
        ingredientGroups.map(
            (elem) => ingredients = ingredients.push(
                {
                    label: elem.get('element'), 
                    value: elem.get('recipe_ingredients')
                }
            )
        )

        ingredients.map(
            (elem, groupIndex) => {
                elem.value.map(
                    (ing, ingIndex) => {

                        // delete destroyed ingredients
                        if(ing.get('_destroy') == true){
                            ingredients = ingredients.deleteIn([groupIndex, 'value', ingIndex])
                        }

                        // delete invalid ingredients
                        if(!(ing.get('amount') && ing.get('ingredient_id') && ing.get('unit_id'))) {
                            ingredients = ingredients.deleteIn([groupIndex, 'value', ingIndex])
                        }
                    }
                )
            }
        )

        console.log(ingredients.toJS()[0].value)


        // make array of unique ingredients from steps with usedAmount field
        // which is sum of all amounts of same ingredient
        let steps = this.state.json.get('recipe_steps').toJS()
        let stepIngredients = []
        steps.map(
            elem => elem.step_ingredients.map(
                ing => {
                    let duplicateIndex = stepIngredients.findIndex(x => x.recipe_ingredient_id == ing.recipe_ingredient_id)
                    if ( duplicateIndex == -1 ){
                        let newIngredient = Object.assign({}, ing, {usedAmount: (parseFloat(ing.amount) ? parseFloat(ing.amount) : 0)})
                        // console.log('ING AMOUNT',ing.amount)
                        stepIngredients.push(newIngredient)
                    }
                    else {
                        stepIngredients[duplicateIndex].usedAmount += (parseFloat(ing.amount) ? parseFloat(ing.amount) : 0)
                    }
                }
            )
        )
        
        // pass usedAmount to ingredients
        ingredients.map(
            (elem, groupIndex) => {
                elem.value.map(
                    (ing, ingIndex) => {
                        let id = ing.get('id')
                        let foundInSteps = stepIngredients.find( x => x.recipe_ingredient_id == id)
                        ingredients = ingredients.setIn([groupIndex, 'value', ingIndex, 'usedAmount'], 
                            foundInSteps ? foundInSteps.usedAmount: 0)
                    }
                )
            }
        )

        this.setState({ingredients}, () => console.log('ingredients updated'))
    }

    componentDidUpdate(prevProps, prevState){
        // update available ingredients when changed
        if ( Object.keys(prevState.json).length && 
            (!this.state.json.get('ingredient_groups').equals(prevState.json.get('ingredient_groups'))
            || !this.state.json.get('recipe_steps').equals(prevState.json.get('recipe_steps')))){
            this.updateIngredients()
        }
    }

    // update particular state field with passed value. Optional callback when state update finished
    stateUpdater(path, value, callback){
        this.setState({json: this.state.json.setIn(path, value)}, callback)
        // ()=> console.log('stateUpdater',this.state.json.toJS().recipe_steps[11].step_ingredients[3].amount))
    }

    onTitleInput(e){
        this.stateUpdater(['title'], e.target.value)
    }

    // submit form
    onSubmit() {
        updateRecipe(this.state.json.id, parser(this.state.json, this.state.tags))
    }

    render() {
        const { json, units, tags, ingredients, contests } = this.state
        // json.toJS()
        console.log('new render')

        if ( !Object.keys(json).length ){
            return 0
        }

        /* const { 
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
        } = json */
        const recipe_category =         json.get('recipe_category')
        const recipe_cuisine =          json.get('recipe_cuisine')
        const recipe_cuisine_types =    json.get('recipe_cuisine_types')
        const recipe_mealtimes =        json.get('recipe_mealtimes')
        const recipe_user_tags =        json.get('recipe_user_tags')
        const recipe_cooking_methods =  json.get('recipe_cooking_methods')
        const recipe_cuisine_apps =     json.get('recipe_cuisine_apps')
        const recipe_holidays =         json.get('recipe_holidays')
        const recipe_nutrition_types =  json.get('recipe_nutrition_types')
        const recipe_subcategories =    json.get('recipe_subcategories')
        const recipe_steps =            json.get('recipe_steps')
        const title =                   json.get('title')
        const description =             json.get('description')
        const preparation_time =        json.get('preparation_time')
        const ingredient_groups =       json.get('ingredient_groups')
        const setting_commentable =     json.get('setting_commentable')
        const image =                   json.get('image')
        const cooking_time =            json.get('cooking_time')
        const servings =                json.get('servings')
        const contest_id =              json.get('contest_id')
        const contest =                 json.get('contest')
        const setting_rateable =        json.get('setting_rateable')

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
            title:              title ? true: false,
            category:           recipe_category ? (recipe_category.toString().length? true: false) : false,
            national_cuisine:   recipe_cuisine? (recipe_cuisine.toString().length? true: false): false,
            timing:             parseInt(cooking_time, 10)? true: false,
            servings:           parseInt(servings, 10)? true: false,
            ingredients:        this.state.ingredients ? (this.state.ingredients.size? true: false) : false,
            step:               recipe_steps ? (recipe_steps.length? true: false) : false,
            steps_description:  recipe_steps ? (recipe_steps.toJS().find((elem) => elem.body.length === 0)? false: true) : false,
        }
        // console.log(Object.values(validation))

        // form is valid when all required fields are filled
        const isFormValid = (
            Object.values(validation).find(elem => elem === false) === false 
            && Object.values(validation).length
        ) ? false: true

        

        return (
            <>
                { this.state.json && this.state.tags && this.state.units && this.state.ingredients ?
                    (<form id="article-form">
                        <div className='flex-wrapper'>

                            <div className='left-column form-column'>
                                <SideTags 
                                    tags={tags} 
                                    
                                    category={recipe_category}
                                    subcategories={recipe_subcategories}
                                    cookingMethods={recipe_cooking_methods}
                                    cuisine={recipe_cuisine}
                                    cuisineApps={recipe_cuisine_apps}
                                    cuisineTypes={recipe_cuisine_types}
                                    holidays={recipe_holidays}
                                    mealtimes={recipe_mealtimes}
                                    nutritionTypes={recipe_nutrition_types}
                                    userTags={recipe_user_tags}
                                    contest={contest}
                                    contestId={contest_id}

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
                                            value={title}  
                                            className=''
                                            isBig
                                            isValid={validation.title}
                                            placeholder='Введите название рецепта'
                                            stateUpdater={this.stateUpdater} 
                                            updatePath={titleUpdatePath}                                          
                                        />
                                    </div>
                                    {/*
                                    <Dropzone
                                        data={image}
                                        onChange={(val)=> this.stateUpdater('image', val)}
                                    />*/}


                                    
                                    <div className='content-box__content'>
                                        <Editor
                                            data={description}
                                            stateUpdater={this.stateUpdater}
                                        />

                                        <Timings
                                            isValid={validation.timing}
                                            isServingsValid={validation.servings}
                                            cooking_time={cooking_time}
                                            preparation_time={preparation_time} 
                                            servings={servings}
                                            stateUpdater={this.stateUpdater}
                                        />

                                    </div>
                                    
                                    <div className='content-box__content_ingredients'>
                                        <IngredientGroups
                                            recipeId={recipeId}
                                            isValid={validation.ingredients}
                                            data={ingredient_groups}
                                            units={units}
                                            stateUpdater={this.stateUpdater}
                                        />
                                    </div>

                                </div>
                                
                                <Steps
                                    isValid={validation.step}
                                    data={recipe_steps}
                                    ingredientsAvailable={ingredients}
                                    units={units}
                                    stateUpdater={this.stateUpdater}
                                />
                                {/*
                                <Tags data={tags} onChange={(val) => this.stateUpdater('tags', val)}/>*/}
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


