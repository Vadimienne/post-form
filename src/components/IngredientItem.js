import React, { Component } from "react";
import ReactDOM from "react-dom";

import Select from 'react-select'
import Input from 'components/Input'

import 'styles/IngredientItem.sass'

class Ingredient extends Component {
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

  render() {
    const {amount, unit_id, ingredient, ingredient_id} = this.data
    //const { title, unit_ids } = ingredient
    const { onChange } = this.props

    const options = [
      { value: 'шт.', label: 'шт.' },
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
    let defaultValue = options[0]
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

    return (
      <div className='ingredient-item'>
        <Select className='input' value={{label: '', value: ingredient_id}} onChange={this.onIngSelect} styles={customStylesAsync}/>
        <Input className='input input-quantity' value={amount} onChange={(e)=>this.onInput('',e)}/>
        <Select className='ingredient-select' options={options} styles={customStyles} onChange={this.onUnitSelect} value={defaultValue} />
      </div>
    );
  }
}
export default Ingredient;
