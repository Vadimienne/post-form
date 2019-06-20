import React, { Component } from "react";

import Select from 'react-select'
import Input from 'components/Input'
import SelectAsync from 'react-select/async'
import { getIngredients } from 'api/requests'
import { selectStyleShort, selectStyleMedium } from 'config/selectStyles'

import 'styles/IngredientItem.sass'

class IngredientAsync extends Component {
    constructor(props) {
        super(props);
        this.state={
            ingredients: []
        }
        this.ingredients = []
        this.onUnitSelect = this.onUnitSelect.bind(this)
        this.onIngSelect = this.onIngSelect.bind(this)
        this.loadOptions = this.loadOptions.bind(this)
    }

    onInput(type, e){
        let data = [...this.props.data]
        data[type] = e.target.value
        this.props.onChange(data)
    }

    onSelect(selectedOption){
        let data = [...this.props.data]
        data.metric = selectedOption.value
        this.props.onChange(data)
    }

    onUnitSelect(selectedOption){
        let data = [...this.props.data]
        data.unit_id = selectedOption.value
        this.props.onChange(data)
    }

    onIngSelect(selectedOption){
        let data = [...this.props.data]
        data.ingredient_id = selectedOption.value
        data.ingredient.id = selectedOption.value
        data.ingredient.title = selectedOption.label
        data.ingredient.unit_ids = this.ingredients.find((el)=>el.id===selectedOption.value).validAmountTypes
        this.props.onChange(data)
    }

    async loadOptions(str){
        let ingredients = await getIngredients(str)
        let mappedIngredients = ingredients.map((elem) => {return {label: elem.name, value: elem.id}})
        //console.log(ingredients)
        this.setState({ingredients})
        this.ingredients = ingredients
        return mappedIngredients
    }

    render() {
        const { ingredient, amount, unit_id, ingredient_id } = this.props.data
        const { title, unit_ids } = ingredient
        const { units } = this.props


        //getting array of all available metrics for
        let filteredOptions = units?  unit_ids.map((elem) => units.find((x)=> x.id===elem )): []
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
            let temp = units.find((x)=> x.id===unit_id)
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
                    className='' value={{ value: ingredient_id, label: title }}
                    loadOptions={this.loadOptions}
                    styles={selectStyleMedium}
                    onChange={this.onIngSelect}
                />
                <Input className='input input-quantity' value={amount} onChange={(e)=>this.onInput('amount',e)}/>
                <Select className='ingredient-select' options={options} styles={selectStyleShort} onChange={this.onUnitSelect} value={defaultValue} />
            </div>
        );
    }
}
export default IngredientAsync;
