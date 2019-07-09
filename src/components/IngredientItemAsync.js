import React, { PureComponent } from "react";

import Select from 'react-select'
import Input from 'components/Input'
import MenuList from 'components/SelectMenuList'
import SelectAsync from 'react-select/async'
import { getIngredients } from 'api/requests'
import { createIngredient } from 'api/ingredients'
import { selectStyleShort, selectStyleMedium } from 'config/selectStyles'
import { throttle } from 'helpers'

import 'styles/IngredientItem.sass'

class IngredientAsync extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            ingredients: [],
            selectedIngredient: {},
            amount: '',
            selectedUnit: {}, 
            data: {}
        }
        this.ingredients = []
        this.onUnitSelect = this.onUnitSelect.bind(this)
        this.onIngSelect = this.onIngSelect.bind(this)
        this.loadOptions = this.loadOptions.bind(this)
        this.onAmountInput = this.onAmountInput.bind(this)
        this.createIngredientOnServer = this.createIngredientOnServer.bind(this)
    }

    componentDidMount(){
        // set initial state
        this.setState({selectedIngredient: this.props.data.ingredient})
        this.setState({amount: this.props.data.amount})
        this.setState({selectedUnit: this.props.data.unit_id})
        this.setState({data: this.props.data})
    }


    // send valid ingredient to server and write it to Local and Main state
    async createIngredientOnServer(){
        let data = this.state.data

        // when all fields of ing are valid and ing has no recipe_ingredient_id (id) 
        // send ing to the server
        // get recipe_ingredient_id and write ing to local state and Main state
        if (data.get('amount') && data.get('ingredient_id') && data.get('unit_id') ) {
            if (!data.get('id')) {
                // prepare data and send it to the server
                data.set('element', this.props.groupInfo.element)
                data.set('element_position', this.props.groupInfo.element_position)
                let response = await createIngredient(this.props.recipeId, data.toJS())
                let recipe_ingredient_id = response.id

                // delete data.element
                // delete data.element_position
                console.log('data',data)
                data.delete('element')
                data.delete('element')
                data.set('id', recipe_ingredient_id)
                this.props.stateUpdater(['ingredient_groups', this.props.groupIndex, 'recipe_ingredients', this.props.updatePath], data)
                this.setState({data})
            }
            // if all fields are valid and recipe_ingredient_id is present, just send data to the state
            else {
                // this.props.onChange(data)
                console.log('hello', data)
                this.props.stateUpdater(['ingredient_groups', this.props.groupIndex, 'recipe_ingredients', this.props.updatePath], data)
            }
        }
    }

    //triggers when ingredient is selected
    onIngSelect(selectedOption){
        let data = this.state.data
        data.set('ingredient_id', selectedOption.value.id)
        data.setIn(['ingredient', 'id'], selectedOption.value.id)
        data.setIn(['ingredient', 'title'], selectedOption.label)
        data.setIn(['ingredient', 'unit_ids'], selectedOption.value.unit_ids)
        console.log('ONINGSELECT')
        setTimeout(() =>console.log(data.toJS(), selectedOption), 3000)
        this.setState({data}, this.createIngredientOnServer)
    }

    // triggers on amount input
    onAmountInput(path, value){
        const { groupIndex, updatePath } = this.props
        this.props.stateUpdater(['ingredient_groups', groupIndex, 'recipe_ingredients', updatePath, 'amount'], value)
    }

    // triggers when unit is selected
    onUnitSelect(selectedOption){
        let data = clone(this.state.data)
        data.unit_id = selectedOption.value
        this.setState({data}, this.createIngredientOnServer)
        
    }

    // load ingredients
    async loadOptions(str){
        if(str && str.length > 1) {
            let throttleIngs = throttle(() => getIngredients(str), 1000)
            let ingredients = await throttleIngs()
            let mappedIngredients = ingredients.map((elem) => {return {label: elem.title, value: elem}})
            
            this.setState({ingredients})
            this.ingredients = ingredients
            return mappedIngredients
        }
    }

    render() {
        // const { ingredient, amount, unit_id, ingredient_id } = this.state.data ? this.state.data: {}
        // const { title, unit_ids } = ingredient ? ingredient: {}
        const { units } = this.props
        
        const ingredient = this.props.data.get('ingredient')
        const unit_id = this.props.data.get('unit_id')
        const amount = this.props.data.get('amount')
        const ingredient_id = this.props.data.get('ingredient_id')

        const title = ingredient.get('title')
        const unit_ids = ingredient.get('unit_ids')

        //getting array of all available metrics for Unit Select
        let filteredOptions = units && unit_ids?  unit_ids.map((elem) => units.find((x)=> x.id===elem )): []
        let options = filteredOptions.map((elem)=>{
            if(elem) {
                return { label: elem.title, value: elem.id }
            }
            else {
                return { label: '', value: '' }
            }
        })


        //setting initial metric value
        let defaultValue
        if (unit_id && units){
            let temp = units.find(
                (x) => x.id === unit_id
            )
            if(temp){
                defaultValue = {label: temp.title, value: temp.id}
            }
            else{
                defaultValue = {label: '', value: ''}
            }
        }

        return (
            <div className='ingredient-item'>
                <SelectAsync
                    components={{ MenuList: MenuList }}
                    value={{ value: ingredient_id, label: title }}
                    loadOptions={this.loadOptions}
                    styles={selectStyleMedium}
                    onChange={this.onIngSelect}
                />
                <Input 
                    className='input input-quantity' 
                    value={amount} 
                    stateUpdater={this.onAmountInput}
                    updatePath='amount'
                />
                <Select 
                    className='ingredient-select' 
                    options={options} 
                    styles={selectStyleShort} 
                    onChange={this.onUnitSelect} 
                    value={defaultValue} 
                />
            </div>
        );
    }
}
export default IngredientAsync;
