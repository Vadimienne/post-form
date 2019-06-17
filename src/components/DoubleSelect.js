import React, { Component } from "react";
import ReactDOM from "react-dom";

import Select from 'react-select'

import Check from 'components/Checkbox'

import { borderColorize, borderInvalid } from 'config/selectStyles'

class DoubleSelect extends Component {
  constructor(props) {
    super(props);
    this.onCategorySelect = this.onCategorySelect.bind(this)
  }

  onCategorySelect(selected){
    this.props.onCategoryChange(selected.value)
    this.props.onSubcategoryChange([])
  }

  toggleCheck(id, isActive){
    let array = this.props.subcategories
    isActive ?
    array.splice( array.indexOf(id), 1 )
    :
    array.push( id )
    this.props.onSubcategoryChange(array)
  }

  render() {

    const { categoryScaffold, subcategories, category, isValid } = this.props

    let options = categoryScaffold.map((elem)=>{return{label: elem.name, value: elem.id}})
    let selectedCategory = categoryScaffold.find((elem) => elem.id === category)
    let selectedValue = {label: selectedCategory.name, value: selectedCategory.id}

    let allSubcategories = categoryScaffold.find((elem) => elem.id === category).recipe_subcategory

    let checkboxes = allSubcategories.map((elem, index)=> {
      let isActive = subcategories.includes(elem.id)? true: false
      return(
      <Check key={'checkbox-'+index}
        isActive={isActive}
        text={elem.name}
        onToggle={()=> this.toggleCheck(elem.id, isActive)}
      />
    )}
    ) 

    return (
      <>
        <span className={'category_section_title' + (isValid !== false? '': ' invalid')}>{this.props.header}</span>
        <Select options={options} onChange={this.onCategorySelect} defaultValue={selectedValue} onChange={this.onCategorySelect}
          styles={isValid !== false ? borderColorize : borderInvalid} placeholder='Начните вводить название'
        />
        <div>{checkboxes}</div>
      </>
    );
  }
}
export default DoubleSelect;
