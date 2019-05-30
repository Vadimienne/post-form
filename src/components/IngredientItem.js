import React, { Component } from "react";
import ReactDOM from "react-dom";

import Select from 'react-select'

import 'styles/IngredientItem.sass'

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data
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

  render() {
    const {name, quantity, metric} = this.data
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
    let defaultValue
    if(metric.length){
    for (let i = 0; i < options.length; i++){
      if(options[i].value == metric){
        defaultValue = options[i]
        break
      }
    }}
    else {
      defaultValue = {label:'', value: ''}
    }

    const customStyles = {
      container: (provided, state) => ({
        ...provided,
        width:'100px'
      }),

    }
    console.log(defaultValue)

    return (
      <div className='ingredient-item'>
        <input value={name} onChange={(e)=>this.onInput('name',e)}/>
        <input value={quantity} onChange={(e)=>this.onInput('quantity',e)}/>
        <Select className='ingredient-select' options={options} styles={customStyles} onChange={this.onSelect.bind(this)} value={defaultValue} />
      </div>
    );
  }
}
export default Ingredient;
