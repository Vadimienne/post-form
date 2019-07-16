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
            isIngSelected: false,
            selectedIngredient: null,
        }
        /* this.onUnitSelect = this.onUnitSelect.bind(this) */
        this.onIngSelect = this.onIngSelect.bind(this)
        this.onAmountInput = this.onAmountInput.bind(this)
        this.inputRef = React.createRef()
        this.suggestionRef = React.createRef()
        this.onClickSuggestion = this.onClickSuggestion.bind(this)
        this.onFocusOut = this.onFocusOut.bind(this)
        this.onFocus = this.onFocus.bind(this)

        this.updateSelectedIngredient = this.updateSelectedIngredient.bind(this)
        this.checkAmount = this.checkAmount.bind(this)
    }

    componentDidMount(){
        console.log('HELLO THERE', this.props.data.get('recipe_ingredient_id'))
        if (this.props.data.get('recipe_ingredient_id')){
            this.updateSelectedIngredient(this.checkAmount)
        }
    }

    componentDidUpdate(){
        this.state.isIngSelected &&
        this.updateSelectedIngredient(this.checkAmount)
    }

    updateSelectedIngredient(callback){
        const { ingredientsAvailable, data } = this.props

        let amount = data.get('amount')

        let parsedAvailable = Immutable.List()
        isImmutable(ingredientsAvailable) ? ingredientsAvailable.map(
            (elem) => elem.value.map(
                (ing) => parsedAvailable = parsedAvailable.push(ing)
            )
        ): []

        // select one ingredient that matches data's recipe_ingredient_id 
        let selectedIngredient = parsedAvailable? parsedAvailable.find(
            (elem) => elem.get('id') === data.get('recipe_ingredient_id')
        ): undefined

        this.setState({selectedIngredient}, () => {
            this.setState({isIngredientSelected: true})
            callback? callback(): null
        })
    }

    checkAmount(){

        if(this.props.stepIndex == 3) {
            console.log('used', this.state.selectedIngredient.get('usedAmount'))
        }
        
        let all = this.state.selectedIngredient.get('amount')
        let used = this.state.selectedIngredient.get('usedAmount')

        if (all - used < 0){
            this.inputRef.current.nextSibling.style = 'display: inline-block;'
            this.inputRef.current.nextSibling.innerHTML= `Доступно ${all}&nbsp; Использовано ${used}`
        }
        return({all: all, used: used})
        
    }

    // triggers on amount input
    onAmountInput(e){
        let value = e.target.value
        this.props.stateUpdater(['recipe_steps', this.props.stepIndex, 'step_ingredients', this.props.updatePath, 'amount'], parseFloat(value? value: 0))

    }

    onClickSuggestion(){
        this.suggestionRef.current.style='display: none;'
    }

    onFocus(){
        this.inputRef.current.nextSibling.style = 'display: block;'
    }

    onFocusOut(){

        let all = this.state.selectedIngredient.get('amount')
        let used = this.state.selectedIngredient.get('usedAmount')

        if (all - used >= 0){
            this.inputRef.current.nextSibling.style = 'display: none;'
            this.inputRef.current.nextSibling.innerHTML= `Доступно ${all}&nbsp; Использовано ${used}`
        }
        // let all = this.state.selectedIngredient.get('amount')
        // let used = this.state.selectedIngredient.get('usedAmount')
        // let result = this.props.data.get('amount')
        // if(all - used < 0){
        //     result = 0
        // }
        // this.props.stateUpdater(['recipe_steps', this.props.stepIndex, 'step_ingredients', this.props.updatePath, 'amount'], parseFloat(result? result: 0))
    }

    // triggers when ingredient is selected
    onIngSelect(selectedOption){
        let data = this.state.data
        // data.recipe_ingredient_id = selectedOption.value
        // this.props.onChange(data)

        // data.set('recipe_ingredient_id', selectedOption.value)
        this.props.stateUpdater(['recipe_steps', this.props.stepIndex, 'step_ingredients', this.props.updatePath, 'recipe_ingredient_id'], 
            selectedOption.value, this.updateSelectedIngredient)

    }

    render() {
        
        const { units, ingredientsAvailable, data } = this.props

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

        ingredientOptions = ingredientOptions.toJS()

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

        console.log('INGREDIENT OPTIONS:', ingredientOptions)

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
                    {/*<Input 
                        className='input input-quantity' 
                        value={this.props.amount} 
                        stateUpdater={this.onAmountInput}
                    />*/}
                    <div className='input input-quantity'>
                        <div className='field-container' ref={this.inputRef}>
                            <input
                                onFocus={this.onFocus}
                                onBlur={this.onFocusOut}
                                className='text-input' 
                                value={amount || amount == 0 ? amount : ''}
                                onChange={this.onAmountInput}
                                
                            />
                        </div>
                        { !!selectedIngredient && 
                        <span className='input-suggestion' onClick={this.onClickSuggestion} ref={this.suggestionRef}>
                            {`Доступно ${selectedIngredient.get('amount')} Использовано ${selectedIngredient.get('usedAmount')}`}
                        </span>}
                    </div>
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
