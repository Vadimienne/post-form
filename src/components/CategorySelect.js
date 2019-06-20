import React, { Component } from "react";

import Select from 'react-select'

import {borderColorize, borderInvalid} from 'config/selectStyles'

class CategorySelect extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(selected){
        if (this.props.isMulti) {
            let ids = selected.map((elem) => elem.value)
            this.props.onChange(ids)
        }
        else {
            this.props.onChange(selected.value)
        }
    }

    render() {

        const { categoryScaffold, selectedCategory, isValid } = this.props
        // Map options and find default value of select depending on whether it is array or single value
        let options = categoryScaffold.map((elem)=> {return{ label: elem.name, value: elem.id }})
        let defaultValue

        if (this.props.isMulti){
            let filteredCategories = selectedCategory.map((selected) => categoryScaffold.find((elem) => elem.id == selected))
            defaultValue = filteredCategories.map((elem)=> {return{ label: elem.name, value: elem.id }})
        }
        else{
            let foundCategory = categoryScaffold.find((elem)=> elem.id == selectedCategory)
            defaultValue = { label: foundCategory.name, value: foundCategory.id }
        }

        return (
            <>
                <span className={'category_section_title' + (isValid !== false? '': ' invalid')}>{this.props.header}</span>
                <Select
                    isMulti={this.props.isMulti} onChange={this.onSelect} options={options} defaultValue={defaultValue}
                    styles={isValid !== false ? borderColorize : borderInvalid} placeholder='Начните вводить название'
                />
            </>
        );
    }
}
export default CategorySelect;
