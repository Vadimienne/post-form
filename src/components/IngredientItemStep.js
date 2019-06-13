import React, { Component } from "react";
import ReactDOM from "react-dom";

import Select from 'react-select'
import Input from 'components/Input'
import SelectAsync from 'react-select/async'
import { getIngredients } from 'api/requests'

import 'styles/IngredientItem.sass'

class IngredientStep extends Component {
  constructor(props) {
    super(props);
    this.state={
      isIngSelected: false
    }
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

  render() {
    console.log(this.props)
    const { onChange, units, ingredientsAvailable, data } = this.props
    const { ingredient, amount, unit_id, ingredient_id } = data
    //const { title, unit_ids } = ingredient


    // let filteredOptions = unit_ids.map((elem) => units.find((x)=> x.id===elem ))
    // let options = filteredOptions.map((elem)=>{
    //   if(elem) {
    //     return { label: elem.title, value: elem.id }
    //   }
    //   else {
    //     return { label: '', value: '' }
    //   }
    // })

    let enrichedData = data

    enrichedData.title = ingredientsAvailable? ingredientsAvailable.find((elem) => elem.ingredient_id === data.ingredient_id).ingredient.title: ''
    console.log(enrichedData)


    //setting initial metric value
    // let defaultValue
    // if (unit_id && units){
    //   let temp = units.find((x)=> x.id===unit_id)
    //   if(temp){
    //     defaultValue = {label: temp.title, value: temp.id}
    //   }
    //   else{
    //     defaultValue = {label: '', value: ''}
    //   }
    // }

    let options = ingredientsAvailable? ingredientsAvailable.map(
      (elem) => { return { label: elem.ingredient.title, value: elem.ingredient_id } }
    ): undefined

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

    const customStylesLong = {
      container: (provided, state) => ({
        ...provided,
        width:'570px'
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

    //let selectValue = { value: ingredient_id, label: title }

    return (
      <>
      {this.state.isIngSelected ?(
        <div className='ingredient-item'>
          <Select className='input' value={{label: 'title', value: ingredient_id}} onChange={this.onIngSelect} styles={customStylesAsync}/>
          <Input className='input input-quantity' value={amount} onChange={(e)=>this.onInput('amount',e)}/>
          <Select className='ingredient-select' options={options} styles={customStyles} onChange={this.onUnitSelect} value={defaultValue} />
        </div>)
        :(
        <div className='ingredient-item'>
          <Select className='input' onChange={this.onIngSelect} styles={customStylesLong} options={options}/>
        </div>)
      }
      </>
    );
  }
}
export default IngredientStep;
