import React, { PureComponent } from "react";
import Immutable, { isImmutable } from 'immutable'

import Select from 'react-select'
import Input from 'components/Input'
import { selectStyleShort, selectStyleMedium } from 'config/selectStyles'

import 'styles/IngredientItem.sass'

class IngredientStep extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            isIngSelected: true
        }
        /* this.onUnitSelect = this.onUnitSelect.bind(this) */
        this.onIngSelect = this.onIngSelect.bind(this)
        this.onAmountInput = this.onAmountInput.bind(this)
    }

    // triggers on amount input
    onAmountInput(path, value){
        this.props.stateUpdater(['recipe_steps', this.props.stepIndex, 'step_ingredients', this.props.updatePath, 'amount'], value)
    }

    // triggers when ingredient is selected
    onIngSelect(selectedOption){
        let data = clone(this.props.data)
        data.recipe_ingredient_id = selectedOption.value
        this.props.onChange(data)
    }

    componentDidUpdate(prevProps){
        // console.log('StepIndex: ', this.props.stepIndex, this.props.updatePath)
        if(this.props.stepIndex == 11 && this.props.updatePath == 3){
            console.log('iM AMOUNT:', this.props.amount, prevProps.amount)
        }
    }

    render() {
        
        const { units, ingredientsAvailable, data } = this.props
        // const { amount, recipe_ingredient_id } = this.props.data

        const amount =  this.props.data.get('amount')
        const recipe_ingredient_id =  this.props.data.get('recipe_ingredient_id')

        // PROCESSING AVAILABLE INGREDIENTS
        // push ingredients from all groups into one array
        let parsedAvailable = Immutable.List()
        isImmutable(ingredientsAvailable) && Object.keys(ingredientsAvailable).length ? ingredientsAvailable.map(
            (elem) => elem.value.map(
                (ing) => parsedAvailable = parsedAvailable.push(ing)
            )
        ): []

        // select one ingredient that matches data's recipe_ingredient_id 
        let selectedIngredient = parsedAvailable? parsedAvailable.find(
            (elem) => elem.get('id') === data.get('recipe_ingredient_id')
        ): undefined

        // extract unit_id from selectedIngredient
        const unit_id = selectedIngredient ? selectedIngredient.get('unit_id') : null


        // PROCESS INGREDIENTS FOR SELECTOR 
        // map ingredient options
        let ingredientOptions = ingredientsAvailable ? ingredientsAvailable.map(
            (elem) => {
                return { label: elem.label, options: elem.value.map(
                    (ing) => {
                        return { label: ing.get('ingredient').get('title'), value: ing.get('id') }
                    }
                )}
            }
        ): []

        // gen selected ingredient object
        let selectedValue = { value: recipe_ingredient_id, label: (selectedIngredient? selectedIngredient.get('ingredient').get('title'): '') }


        // PROCESSING UNITS
        // get available units for current ingredient
        const unit_ids = (selectedIngredient? selectedIngredient.get('ingredient').get('unit_ids') : {})


        // Have valid units ids. Select units with same ids from all units list to get title
        let filteredOptions = units && Object.keys(unit_ids).length ? unit_ids.map(
            (elem) => units.find(
                (x)=> x.id===elem
            )
        ) : []

        // Then map unit options for selector
        let metricOptions = filteredOptions.map((elem)=>{
            if(elem) {
                return { label: elem.title, value: elem.id }
            }
            else {
                return { label: '', value: '' }
            }
        })

        // Select current unit value based on ingredient's unit_id
        let metric = units && unit_ids && unit_id ? 
            {value: unit_id, label: metricOptions.find((el) => el.value === unit_id).label}
            : null

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
                        value={this.props.amount} 
                        stateUpdater={this.onAmountInput}
                    />
                    <Select 
                        className='ingredient-select' 
                        isDisabled
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
