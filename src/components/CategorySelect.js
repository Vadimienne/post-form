import React, { Component } from "react";
import { fromJS } from 'immutable'
import Select from 'react-select'

import {defaultStyle, borderInvalid} from 'config/selectStyles'

class CategorySelect extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(selected){
        if (this.props.isMulti) {
            let ids = selected.map((elem) => elem.value)
            // this.props.onChange(ids)
            this.props.stateUpdater([this.props.updatePath], fromJS(ids))
        }
        else {
            this.props.stateUpdater([this.props.updatePath], selected.value)
        }
    }

    render() {
        // console.log('CategorySelect: ', this.props)

        const { categoryScaffold, selectedCategory, isValid, header } = this.props

        // Map options for Select
        let options = categoryScaffold.map(
            (elem) => { 
                return { label: elem.name, value: elem.id }
            }
        )

        // calc defaultValue for multi- or regular Select
        let defaultValue

        if( selectedCategory ){
            if (this.props.isMulti){
                // find intersection of selectedCategory[] and categoryScaffold[]
                let filteredCategories = selectedCategory.map(
                    (selected) => categoryScaffold.find(
                        (elem) => elem.id == selected
                    )
                )
                
                
                // map value for Select
                defaultValue = filteredCategories.toJS().map(
                    (elem) => { 
                        return { label: elem.name, value: elem.id }
                    }
                )
            }
            else{
                // find selectedCategory in scaffold and make a value for Select
                let foundCategory = categoryScaffold.find(
                    (elem) => elem.id == selectedCategory
                )
                defaultValue = { label: foundCategory.name, value: foundCategory.id }
            }
        }

        return (
            <>
                <span className={'category_section_title' + (isValid !== false? '': ' invalid')}>
                    <div className='warning-icon'>&#xea3a;</div>
                    {header}
                </span>
                <Select
                    isMulti={this.props.isMulti} 
                    onChange={this.onSelect} 
                    options={options} 
                    defaultValue={defaultValue}
                    styles={isValid !== false ? defaultStyle : borderInvalid} 
                    placeholder='Начните вводить название'
                />
            </>
        );
    }
}
export default CategorySelect;
