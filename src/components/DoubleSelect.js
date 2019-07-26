import React, { PureComponent } from "react";

import Select from 'react-select'
import Immutable from 'immutable'

import Check from 'components/Checkbox'

import { borderColorize, borderInvalid } from 'config/selectStyles'

class DoubleSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.onCategorySelect = this.onCategorySelect.bind(this)
        this.toggleCheck = this.toggleCheck.bind(this)
    }

    // send category change to state
    onCategorySelect(selected){
        this.props.stateUpdater(['recipe_category'], selected.value, () => this.props.stateUpdater(['recipe_subcategories'], Immutable.List()))
    }

    // send subcategory change to state
    toggleCheck(id, isActive){

        let array = this.props.subcategories
        let newArray
        isActive?
            newArray = array.delete(array.indexOf(id))
            : newArray = array.push( id )

        this.props.stateUpdater(['recipe_subcategories'], newArray)
    }

    render() {

        const { categoryScaffold, subcategories, category, isValid } = this.props

        // map options for Select
        let options = categoryScaffold.map(
            (elem) => {
                return{ label: elem.name, value: elem.id }
            }
        )

        // find selected option
        let selectedValue = options.find(
            (elem) => elem.value === category
        )
        
        // get subcategories array
        let allSubcategories = category ? 
            categoryScaffold.find( (elem) => elem.id === category ).recipe_subcategory 
            : []
        
        // map checkboxes
        let checkboxes = allSubcategories.map((elem, index)=> {
            let isActive = subcategories.includes(elem.id)? true: false
            return(
                <Check
                    key={'checkbox-'+index}
                    isActive={isActive}
                    text={elem.name}
                    elemId={elem.id}
                    
                    stateUpdater={this.toggleCheck}
                />
            )}
        )

        return (
            <>
                <span className={'category_section_title' + (isValid !== false? '': ' invalid')}>
                    <div className='warning-icon'>&#xea3a;</div>
                    {this.props.header}
                </span>

                <Select
                    options={options} 
                    onChange={this.onCategorySelect} 
                    defaultValue={selectedValue} 
                    styles={isValid !== false ? borderColorize : borderInvalid} 
                    placeholder='Начните вводить название'
                />
                <div>{checkboxes}</div>
            </>
        );
    }
}
export default DoubleSelect;
