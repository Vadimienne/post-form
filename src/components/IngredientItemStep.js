import React, { PureComponent } from "react";
import Immutable, { isImmutable } from 'immutable'

import Select from 'react-select'
import { selectStyleShort, selectStyleMedium, borderInvalid } from 'config/selectStyles'

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
            this.setState({isIngSelected: true})
            callback? callback(): null
        })
    }

    checkAmount(){

        let all = this.state.selectedIngredient.get('amount')
        let used = this.state.selectedIngredient.get('usedAmount')

        // if(this.props.stepIndex == 3) {
        //     console.log('used', this.state.selectedIngredient.get('usedAmount'))
        //     console.log('all: ', all)
        // }

        if (all - used < 0 || this.inputRef.current.isFocused){
            this.inputRef.current.nextSibling.style = 'display: inline-block;'
        }
        else{
            this.inputRef.current.nextSibling.style = 'display: none;'
        }
        return({all: all, used: used})
        
    }

    // triggers on amount input
    onAmountInput(e){
        let value = e.target.value
        this.props.stateUpdater(['recipe_steps', this.props.stepIndex, 'step_ingredients', this.props.updatePath, 'amount'], value? parseFloat(value) : '')

    }

    onClickSuggestion(){
        this.suggestionRef.current.style='display: none;'
    }

    onFocus(){
        this.inputRef.current.nextSibling.style = 'display: block;'
        this.inputRef.current.isFocused = true
    }

    onFocusOut(){
        let all = parseFloat(this.state.selectedIngredient.get('amount'))
        let used = parseFloat(this.state.selectedIngredient.get('usedAmount'))

        if (all - used >= 0){
            this.inputRef.current.nextSibling.style = 'display: none;'
        }
        this.inputRef.current.isFocused = false
    }

    // triggers when ingredient is selected
    onIngSelect(selectedOption){
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
        let selectedValue = recipe_ingredient_id ? 
            { value: recipe_ingredient_id, label: (selectedIngredient? selectedIngredient.get('ingredient').get('title'): '') }
            : undefined


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
                        styles={recipe_ingredient_id ? selectStyleMedium: Object.assign({}, selectStyleMedium, borderInvalid)}
                        placeholder='Начните вводить название'
                    />
                    {/*<Input 
                        className='input input-quantity' 
                        value={this.props.amount} 
                        stateUpdater={this.onAmountInput}
                    />*/}
                    <div className='input input-quantity'>
                        <div className={'field-container' + (amount ? '': ' invalid')} ref={this.inputRef}>
                            <input
                                onFocus={this.onFocus}
                                onBlur={this.onFocusOut}
                                className='text-input' 
                                value={amount || amount == 0 ? amount : ''}
                                onChange={this.onAmountInput}
                                
                            />
                        </div>
                        { !!selectedIngredient && 
                        <span 
                            className={`input-suggestion ${selectedIngredient.get('amount') - selectedIngredient.get('usedAmount') >= 0 ? 'valid': ''}`} 
                            onClick={this.onClickSuggestion} 
                            ref={this.suggestionRef} 
                            style={{display: 'none'}}
                        >
                            <span className='input-suggestion__item'>{`Доступно ${selectedIngredient.get('amount')}`}</span> <br/>
                            <span className='input-suggestion__item'>{`Использовано ${selectedIngredient.get('usedAmount')}`}</span>
                        </span>}
                    </div>
                    <Select 
                        className='ingredient-select' 
                        isDisabled
                        styles={selectStyleShort} 
                        onChange={this.onUnitSelect} 
                        value={metric} 
                        placeholder='...'
                    />
                </div>

            </>
        );
    }
}
export default IngredientStep;
