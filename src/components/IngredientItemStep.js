import React, { Component } from "react";
import ReactDOM from "react-dom";

import Select from 'react-select'
import Input from 'components/Input'
import SelectAsync from 'react-select/async'
import { getIngredients } from 'api/requests'
import { selectStyleShort, selectStyleMedium, selectStyleLong } from 'config/selectStyles'

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
    let data = this.props.data
    data[type] = e.target.value
    this.props.onChange(data)
  }

  onUnitSelect(selectedOption){
    let data = this.props.data
    data.unit_id = selectedOption.value
    this.props.onChange(data)
  }

  onIngSelect(selectedOption){
    let data = this.props.data
    data.ingredient_id = selectedOption.value
    this.props.onChange(data)
  }

  render() {
    const { onChange, units, ingredientsAvailable, data } = this.props
    const { amount, unit_id, ingredient_id } = this.props.data

    // Have ingredient ID from .data. Select ingredeint with same id from
    // all available ingredients
    //console.log(ingredientsAvailable)
    let selectedIngredient = ingredientsAvailable? ingredientsAvailable.find((elem) => elem.ingredient_id === data.ingredient_id): undefined


    // figure out what title and available units are
    const { title, unit_ids } = (selectedIngredient? selectedIngredient.ingredient : {})


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
    let ingredientOptions = ingredientsAvailable? ingredientsAvailable.map(
      (elem) => { return { label: elem.ingredient.title, value: elem.ingredient_id } }
    ): undefined

    // Value of selected ingredient
    let selectedValue = { value: ingredient_id, label: (selectedIngredient? selectedIngredient.ingredient.title: '') }

    let groupedOptions = [{label: 'colors',options: [{label:'red'},{label:'blue'}]}]
    //let availableIngOptions = ingredeints.

    return (
      <>
      {this.props.data.ingredient_id ?(
        <div className='ingredient-item'>
          <Select className='input' options={ingredientOptions} value={selectedValue} onChange={this.onIngSelect} styles={selectStyleMedium}/>
          <Input className='input input-quantity' value={amount} onChange={(e)=>this.onInput('amount',e)}/>
          <Select className='ingredient-select' options={metricOptions} styles={selectStyleShort} onChange={this.onUnitSelect} value={metric} />
        </div>)
        :(
        <div className='ingredient-item'>
          <Select className='input' onChange={this.onIngSelect} styles={selectStyleLong} options={groupedOptions}/>
        </div>)
      }
      </>
    );
  }
}
export default IngredientStep;
