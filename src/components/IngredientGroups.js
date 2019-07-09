import React, { PureComponent } from "react";

import { sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { fromJS } from 'immutable'

import SortDeleteWrapper from 'components/SortDeleteWrapper'
import Button from 'components/ConstructorBtn'
import IngredientList from 'components/IngredientList'
import Input from 'components/Input'
import Ingredient from 'components/IngredientItemAsync'

import 'styles/IngredientGroups.sass'

const SortableContainer = sortableContainer(({children}) => {
    return <ul>{children}</ul>;
});

class IngedientGroup extends PureComponent {
    constructor(props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onIngChange = this.onIngChange.bind(this)
        this.addGroup = this.addGroup.bind(this)
    }

    // triggers on sort-button release
    // #tofix
    onSortEnd({oldIndex, newIndex}) {
        let array = clone(this.props.data)

        //sort array
        array = arrayMove(array, oldIndex, newIndex)

        //refresh array's position fields
        array = array.map((elem, index)=> {
            elem.element_position = index + 1
            return elem
        })

        this.props.onChange(array)
    }

    // send IngredientsList changes to state
    //#tofix
    onIngChange(index, value){
        let array = clone(this.props.data)
        array[index].recipe_ingredients = value
        console.log('ONINGCHANGE', array)
        this.props.onChange(array)
    }

    // send group title to state
    //#tofix
    onNameChange(index, value){
        // let array = clone(this.props.data)
        // array[index].element = e.target.value
        // this.props.onChange(array)
        this.props.stateUpdater(['ingredient_groups', index, 'element'], value)
    }




    // #tofix add position
    addGroup(){
        /* console.log('ADDING')
        console.log(this.props.data) */
        let array = this.props.data.toJS()
        array.push(
            {
                element:'', element_position: array.length + 1, recipe_ingredients:[]})
        /*  console.log(this.props.data) */
        // this.props.onChange(array)
        this.props.stateUpdater(['ingredient_groups'], fromJS(array))
    }

    //#tofix
    deleteGroup(index){
        let array = clone(this.props.data)
        array.splice(index,1)
        this.props.onChange(array)
    }

    render() {

        // map groups
        let items = this.props.data ? this.props.data.map((elem, index)=> (
            <SortDeleteWrapper
                name='Укажите ингредиенты' deleteDesc='Удалить подраздел'
                className='sort-delete-ingredients'
                index={index}
                key={`sortable-step-${index}`}
                idType='ingredients'
                onDelete={this.deleteGroup}
            >
                <div className='input-ingredient-group'>
                    <Input  
                        value={elem.get('element')} 
                        placeholder='Основные'
                        stateUpdater={this.onNameChange}
                        updatePath={index}
                    />
                </div>
                {!this.props.isValid? (
                    <span className='ingredients-validation-warning'>Необходимо указать хотя бы один ингредиент</span>
                ): undefined}
                <IngredientList
                    groupName={elem.get('element')}
                    groupPosition={elem.get('element_position')}
                    recipeId={this.props.recipeId}
                    data={elem.get('recipe_ingredients')}
                    units={this.props.units}
                    ingredientItem={Ingredient}
                    listType='groups'
                    stateUpdater={this.props.stateUpdater}
                    updatePath={index}
                />
            </SortDeleteWrapper>
        )): []
        //idType props used to separate different groups of SortDeleteWrappers and make clickable labels for buttons
        items
        console.log('items: ', items);
        return (
            <div className='ingredient-groups-component'>
                { items.size ?
                    <SortableContainer 
                        useWindowAsScrollContainer 
                        onSortEnd={this.onSortEnd} 
                        useDragHandle 
                        lockAxis='y' 
                        key='sortable-container'
                    >
                        {items}
                    </SortableContainer> : undefined}
                <div className='button-offset'>
                    <Button 
                        onClick={this.addGroup} 
                        text='Добавить подраздел' 
                        icon='&#xea0c;'
                        className='add-subsection'
                    />
                </div>
            </div>
        );
    }
}
export default IngedientGroup;
