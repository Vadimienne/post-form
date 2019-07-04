import React, { Component } from "react";

import Select from 'react-select'
import Input from 'components/Input'
import MenuList from 'components/SelectMenuList'
import SelectAsync from 'react-select/async'
import { getIngredients } from 'api/requests'
import { createIngredient } from 'api/ingredients'
import { selectStyleShort, selectStyleMedium } from 'config/selectStyles'
import { throttle, clone } from 'helpers'

import 'styles/IngredientItem.sass'

class IngredientAsync extends Component {
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
        this.createIngredientOnServer = this.createIngredientOnServer.bind(this)
    }

    componentDidMount(){
        this.setState({selectedIngredient: this.props.data.ingredient})
        this.setState({amount: this.props.data.amount})
        this.setState({selectedUnit: this.props.data.unit_id})
        this.setState({data: this.props.data})
    }

    async createIngredientOnServer(){
        let data = clone(this.state.data)
        console.log('Entry', data.amount, data.ingredient_id, data.unit_id)
        if (data.amount && data.ingredient_id && data.unit_id && !data.id) {
            if (!data.id) {
                console.log('if')
                data.element = this.props.groupInfo.element
                data.element_position = this.props.groupInfo.element_position
                let response = await createIngredient(this.props.recipeId, data)
                let recipe_ingredient_id = response.id

                delete data.element
                delete data.element_position
                data.id = recipe_ingredient_id
                this.props.onChange(data)
                this.setState({data})
                return 0
            }
            else {
                this.props.onChange(data)
            }
        }
        else {
            console.log('else')
            return -1
        }
    }

    onInput(type, e){
        let data = clone(this.state.data)
        data[type] = e.target.value
        this.setState({data}, this.createIngredientOnServer)
    }

    onUnitSelect(selectedOption){
        let data = clone(this.state.data)
        data.unit_id = selectedOption.value
        this.setState({data}, this.createIngredientOnServer)
        
    }

    onIngSelect(selectedOption){
        let data = clone(this.state.data)
        data.ingredient_id = selectedOption.value.id
        data.ingredient.id = selectedOption.value.id
        data.ingredient.title = selectedOption.label
        data.ingredient.unit_ids = selectedOption.value.unit_ids
        this.setState({data}, this.createIngredientOnServer)
    }

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
        const { ingredient, amount, unit_id, ingredient_id } = this.state.data ? this.state.data: {}
        const { title, unit_ids } = ingredient ? ingredient: {}
        const { units } = this.props


        //getting array of all available metrics for
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
                    onChange={(e)=>this.onInput('amount',e)}
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
