import React, { PureComponent } from "react";
import parser from 'helpers/toPostRecipeParser'
import { fromJS } from 'immutable'
import { Redirect, Router } from 'react-router-dom'

import Dropzone from 'components/Dropzon';
import Editor from 'components/MyEditor';
import Steps from 'components/Steps'
import IngredientGroups from 'components/IngredientGroups'
import Timings from 'components/Timings'
import Input from 'components/Input'
import CategorySelect from 'components/CategorySelect'

import ErrorPage from 'containers/ErrorPage'
import LoadingRecipePage from 'components/LoadingRecipePage'

import SideSubmitColumn from 'components/SideSubmitColumn'
import SideTags from 'components/SideTags'

import 'styles/index.css'
import 'styles/MainMain.sass'
import 'styles/EdimDomaIcons.sass'
const titleUpdatePath = ['title']

import { getRecipe, getUnits, getTags, getContests, createRecipe, updateRecipe, showPreview } from 'api/requests'
import { sortSortable } from 'helpers'
import { updateIngredients } from './ingredientsUpdater'
import { validate } from './validation'


class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            json: {},
            tags: {},
            failedToFetch: false,
            loading: true,
            isPreviewActive: false,
            previewHTML: ''
        };
        this.stateUpdater = this.stateUpdater.bind(this)
        this.updateIngredients = updateIngredients.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onDraftSubmit = this.onDraftSubmit.bind(this)
        this.onTitleInput = this.onTitleInput.bind(this)
        this.onPreviewToggle = this.onPreviewToggle.bind(this)
    }

    
    // fetch data from the server when app launches
    async componentDidMount(){

        let recipeId = this.props.match.params.recipeId
        let recipe
        let statusRecipe
        if(recipeId === 'new'){
            recipe = await createRecipe()
            this.props.history.push(`/${recipe.id}`)
        }
        else{
            recipe = await getRecipe(this.props.match.params.recipeId)
            statusRecipe = await recipe.status
        }                                                               

        const tagsResponse = await getTags()
        const unitsResponse = await getUnits()
        const contestsResponse = await getContests()

        const statusTags = await tagsResponse.status
        const statusUnits = await unitsResponse.status
        const statusContests = await contestsResponse.status


        if( statusRecipe == 200 && statusTags == 200 && statusUnits == 200 && statusContests == 200 ){
            recipe = await recipe.json()
            recipe = sortSortable(recipe)

            const tags = await tagsResponse.json()
            const units = await unitsResponse.json()
            const contests = await contestsResponse.json()

            console.log('FETCHED FINE')
            this.setState({json: fromJS(recipe)})
            this.setState({tags})
            this.setState({units})
            this.setState({contests: contests})
            this.updateIngredients()

            this.setState({loading: false})
        }
        else {
            console.log('FAILED TO FETCH')
            const statusCodes = [statusRecipe, statusTags, statusUnits, statusContests]
            const failedCode = statusCodes.find(elem => elem != 200)
            this.setState({loading: false, failedToFetch: failedCode})
        }

        // this.setState({tags})
        // this.setState({units})
        // this.setState({contests: contests})
        // this.updateIngredients()
    }

    //#torefactor
    componentDidUpdate(prevProps, prevState){
        // update available ingredients when changed
        if ( Object.keys(prevState.json).length && 
            (!this.state.json.get('ingredient_groups').equals(prevState.json.get('ingredient_groups'))
            || !this.state.json.get('recipe_steps').equals(prevState.json.get('recipe_steps')))){
            this.updateIngredients()
        }
        else if (!this.state.ingredients && this.state.json.size) {
            this.updateIngredients()
        }
    }

    // update particular state field with passed value. Optional callback when state update finished
    stateUpdater(path, value, callback){
        path.map(elem => {
            if (elem === undefined || elem === 'undefined'){
                throw ('undefined found in this path: ', path)
            }
        })
        this.setState({json: this.state.json.setIn(path, value)}, callback)
        // ()=> console.log('stateUpdater',this.state.json.toJS().recipe_steps[11].step_ingredients[3].amount))
    }

    onTitleInput(e){
        this.stateUpdater(['title'], e.target.value)
    }

    // submit form
    onSubmit() {
        updateRecipe(this.state.json.get('id'), parser(this.state.json.toJS(), this.state.tags, 'on_moderation'))
    }

    // save draft
    onDraftSubmit(){
        updateRecipe(this.state.json.get('id'), parser(this.state.json.toJS(), this.state.tags, 'draft'))
    }

    async onPreviewToggle(){
        if(this.state.isPreviewActive){
            this.setState({isPreviewActive: false})
        }
        else{
            let response = await showPreview(this.state.json.get('id'), parser(this.state.json.toJS(), this.state.tags, 'draft'))
            if (response.status == 200) {
                this.setState({previewHTML: response.json().html, isPreviewActive: true})
            }
        }
    }




    render() {
        // if(this.state.failedToFetch){
        //     return <Redirect to='/notfound'/>
        // }
        const { json, units, tags, ingredients, contests, loading, failedToFetch } = this.state
        console.log(`new render, loading: ${loading}, failed: ${failedToFetch}`)

        if (loading){
            return <LoadingRecipePage />
        }
        else if (failedToFetch){
            return <ErrorPage code={failedToFetch}/>
        }

        

        // GETTING DATA
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
        const recipeId = json.get('id')
        

        // VALIDATING FORM

        // TOFIX VALIDATE ACTUAL INGREDIENTS, NOT THIS.STATE.INGREDIENTS 
        let validation = validate({title, recipe_category, recipe_cuisine, cooking_time, servings, ingredients: this.state.ingredients, recipe_steps})

        // Object.keys(validation).map(elem => console.log(`${elem}:`.padEnd(25,' ') + validation[elem]))

        // form is valid when all required fields are filled
        const isFormValid = (
            Object.values(validation).find(elem => elem === false) === false 
            && Object.values(validation).length
        ) ? false: true



        return (
            <div>
                
                { Object.keys(this.state.json).length && Object.keys(this.state.tags).length && this.state.units && this.state.ingredients && this.state.contests ?
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
                                    
                                    <Dropzone
                                        data={image}
                                        recipeId={recipeId}
                                        stateUpdater={this.stateUpdater}
                                        fetchPath='recipe[image]'
                                    />


                                    
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
                                    recipeId={recipeId}
                                    isValid={validation.step}
                                    data={recipe_steps}
                                    ingredientsAvailable={ingredients}
                                    units={units}
                                    stateUpdater={this.stateUpdater}
                                />
                                <div className='content-box'>
                                    <div className='content-box__content_tags'>
                                        <p className='content_tags-title'>Добавьте теги:</p>
                                        <CategorySelect 
                                            categoryScaffold={tags.recipe_user_tag}
                                            selectedCategory={recipe_user_tags}
                                            isMulti
                                            stateUpdater={this.stateUpdater}
                                            updatePath='recipe_user_tags'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="right-column form-column">

                                <SideSubmitColumn 
                                    settingRateable={setting_rateable} 
                                    settingCommentable={setting_commentable} 
                                    stateUpdater={this.stateUpdater} 
                                    isFormValid={isFormValid} 
                                    onSubmit={this.onSubmit}
                                    onDraftSubmit={this.onDraftSubmit}
                                    onPreviewToggle = {this.onPreviewToggle}
                                />

                            </div>
                        </div>
                    </form>):
                    (<LoadingRecipePage />)
                }
            </div>
        );
    }
}
export default Main;


