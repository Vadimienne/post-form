import React, { PureComponent } from "react";

import { sortableContainer } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'helpers';
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
        this.addGroup = this.addGroup.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
    }

    // triggers on sort-button release
    onSortEnd({oldIndex, newIndex}) {
        this.props.stateUpdater(
            ['ingredient_groups'], 
            arrayMoveImmutable(this.props.data, oldIndex, newIndex)
        )
    }

    // send group title to state
    onNameChange(index, value){
        this.props.stateUpdater(['ingredient_groups', index, 'element'], value)
    }

    addGroup(){
        let array = this.props.data
        array = array.push(
            fromJS(
                {
                    element:'', 
                    element_position: array.length + 1, 
                    recipe_ingredients:[]
                }
            )
        )
        this.props.stateUpdater(['ingredient_groups'], array)
    }

    //#tofix
    deleteGroup(index){
        this.props.stateUpdater(['ingredient_groups', index, '_destroy' ], true)
    }

    render() {

        // map groups
        let items = this.props.data ? this.props.data.map((elem, index)=> {
            if (elem.get('_destroy') !== true){
                return (
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
                )
            }
        }
        ): []
        //idType props used to separate different groups of SortDeleteWrappers and make clickable labels for buttons
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
