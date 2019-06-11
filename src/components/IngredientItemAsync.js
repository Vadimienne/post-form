import React, { Component } from "react";
import ReactDOM from "react-dom";

import Select from 'react-select'
import Input from 'components/Input'
import SelectAsync from 'react-select/async'
import { getIngredients } from 'api/requests'

import 'styles/IngredientItem.sass'

class IngredientAsync extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data
    this.onUnitSelect = this.onUnitSelect.bind(this)
    this.onIngSelect = this.onIngSelect.bind(this)
  }

  componentDidUpdate(){
    this.data = this.props.data
  }

  onInput(type, e){
    let data = this.props.data
    data[type] = e.target.value
    this.props.onChange(data)
  }

  onSelect(selectedOption){
    let data = this.props.data
    data.metric = selectedOption.value
    this.props.onChange(data)
  }

  onUnitSelect(selectedOption){
    let data = this.props.data
    data.unit_id = 42
    this.props.onChange(data)
  }

  onIngSelect(selectedOption){
  let data = this.props.data
  data.ingredient_id = selectedOption.value
  data.ingredient.title = selectedOption.label
  this.props.onChange(data)
  }

  async loadOptions(str){
    let ingredients = await requestIngredients(str)
    console.log (await ingredients)
    let mappedIngredients = ingredients.map((elem) => {return {label: elem.name, value: elem.id}})
    return mappedIngredients
  }

  render() {
    //console.log(this.props.data)
    const { ingredient, amount, unit_id, ingredient_id } = this.props.data
    //console.log(ingredient)
    //const { title, unit_ids } = ingredient
    const { title, unit_ids } = ingredient
    const { onChange } = this.props

    const options = [
      { value: 1, label: 'шт.' },
      { value: 'г', label: 'г' },
      { value: 'кг', label: 'кг' },
      { value: 'ч.л.', label: 'ч.л.' },
      { value: 'ст.л.', label: 'ст.л.' },
      { value: 'л', label: 'л' },
      { value: 'мл', label: 'мл' },
      { value: 'см', label: 'см' },
      { value: 'м', label: 'м' },
    ];


    //setting initial metric value
    let defaultValue
    // if(metric.length){
    // for (let i = 0; i < options.length; i++){
    //   if(options[i].value == metric){
    //     defaultValue = options[i]
    //     break
    //   }
    // }}
    // else {
    //   defaultValue = null
    // }

    const customStyles = {
      container: (provided, state) => ({
        ...provided,
        width:'100px'
      }),
      control: (provided, state) => ({
        ...provided,
        borderColor: '#e6e6e6',
        '&:hover': {
           borderColor: '#363636'
        },
        boxShadow: 0
      })

    }

    const customStylesAsync = {
      container: (provided, state) => ({
        ...provided,
        width:'270px'
      }),
      control: (provided, state) => ({
        ...provided,
        borderColor: '#e6e6e6',
        '&:hover': {
           borderColor: '#363636'
        },
        boxShadow: 0
      })

    }
    // console.log('awe mariiiiiiiiiiiiiaaaaaaaaaaaaa')
    // console.log('title  ',title,'ingredient_id ',ingredient_id )
    let selectValue = { value: ingredient_id, label: title }

    return (
      <div className='ingredient-item'>
        <SelectAsync className='' value={{ value: ingredient_id, label: title }}
          loadOptions={this.loadOptions}
          styles={customStylesAsync}
          onChange={this.onIngSelect}
        />
        <Input className='input input-quantity' value={amount} onChange={(e)=>this.onInput('amount',e)}/>
        <Select className='ingredient-select' options={options} styles={customStyles} onChange={this.onUnitSelect} value={defaultValue} />
      </div>
    );
  }
}
export default IngredientAsync;
