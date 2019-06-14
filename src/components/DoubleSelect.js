import React, { Component } from "react";
import ReactDOM from "react-dom";

import Select from 'react-select'

import Check from 'components/Checkbox'

class DoubleSelect extends Component {
  constructor(props) {
    super(props);
  }

  onCategorySelect(selected){
    
  }

  render() {

    const { categoryScaffold, subcategories, category } = this.props

    let options = categoryScaffold.map((elem)=>{return{label: elem.name, value: elem.id}})
    let selectedCategory = categoryScaffold.find((elem) => elem.id = category)
    let selectedValue = {label: selectedCategory.name, value: selectedCategory.id}

    let allSubcategories = categoryScaffold.find((elem) => elem.id === category).recipe_subcategory

    let checkboxes = allSubcategories.map((elem, index)=> (
      <Check key={'checkbox-'+index}
        isActive={(subcategories.includes(elem.id)? true: false)}
        text={elem.name}
        onToggle={()=> this.toggleCheck(index)}
      />
    ))

    return (
      <>
        <Select options={options} onChange={this.onCategorySelect} value={selectedValue}/>
        <div>{checkboxes}</div>
      </>
    );
  }
}
export default DoubleSelect;
