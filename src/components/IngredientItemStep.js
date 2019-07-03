import React, { Component } from "react";

import Select from 'react-select'
import Input from 'components/Input'
import { selectStyleShort, selectStyleMedium } from 'config/selectStyles'

import {clone} from 'helpers'

import 'styles/IngredientItem.sass'

class IngredientStep extends Component {
    constructor(props) {
        super(props);
        this.state={
            isIngSelected: true
        }
        this.onUnitSelect = this.onUnitSelect.bind(this)
        this.onIngSelect = this.onIngSelect.bind(this)
    }

    onInput(type, e){
        let data = [...this.props.data]
        data[type] = e.target.value
        this.props.onChange(data)
    }

    onUnitSelect(selectedOption){
        let data = [...this.props.data]
        data.unit_id = selectedOption.value
        this.props.onChange(data)
    }

    onIngSelect(selectedOption){
        console.log(this.props.data)
        let data = clone(this.props.data)
        data.recipe_ingredient_id = selectedOption.value
        this.props.onChange(data)
    }

    render() {
        
        const { units, ingredientsAvailable, data } = this.props
        const { amount, recipe_ingredient_id } = this.props.data

        // Have ingredient ID from .data. Select ingredient with same id from
        // all available ingredients
        //console.log(ingredientsAvailable)
        let parsedAvailable = []
        ingredientsAvailable ? ingredientsAvailable.map((elem) => elem.value.map((ing) => parsedAvailable.push(ing))): []
        let selectedIngredient = parsedAvailable? parsedAvailable.find((elem) => elem.id === data.recipe_ingredient_id): undefined
        selectedIngredient

        // extract unit_id from selectedIngredient
        const unit_id = selectedIngredient ? selectedIngredient.unit_id : null

        // figure out what title and available units are
        const { unit_ids } = (selectedIngredient? selectedIngredient.ingredient : {})


        // Have valid units ids. Select units with same ids from all units list to get title
        // Then map unit options for ingredient
        let filteredOptions = units && unit_ids ? unit_ids.map((elem) => units.find((x)=> x.id===elem )) : []
        let metricOptions = filteredOptions.map((elem)=>{
            if(elem) {
                return { label: elem.title, value: elem.id }
            }
            else {
                return { label: '', value: '' }
            }
        })

        // Select current unit value based on ingredeint's unit_id
        let metric = units && unit_ids && unit_id? {value: unit_id, label: metricOptions.find((el) => el.value === unit_id).label}: null

        // Select ingredients from available ingredients

        let ingredientOptions = ingredientsAvailable ? ingredientsAvailable.map(
            (elem) => {
                return { label: elem.label, options: elem.value.map(
                    (ing) => {
                        return { label: ing.ingredient.title, value: ing.id }
                    }
                )}
            }
        ): []
        console.log(ingredientsAvailable)

        // Value of selected ingredient
        let selectedValue = { value: recipe_ingredient_id, label: (selectedIngredient? selectedIngredient.ingredient.title: '') }

        return (
            <>

                <div className='ingredient-item'>
                    <Select 
                        className='input' 
                        options={ingredientOptions} 
                        value={selectedValue} 
                        onChange={this.onIngSelect} 
                        styles={selectStyleMedium}
                    />
                    <Input 
                        className='input input-quantity' 
                        value={amount} 
                        onChange={(e)=>this.onInput('amount',e)}
                    />
                    <Select 
                        className='ingredient-select' 

                        styles={selectStyleShort} 
                        onChange={this.onUnitSelect} 
                        value={metric} 
                    />
                </div>

            </>
        );
    }
}
export default IngredientStep;
