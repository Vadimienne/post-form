import React, { PureComponent } from "react";

import { sortableContainer } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'helpers';
import { fromJS } from 'immutable'

import SortDeleteWrapper from 'components/SortDeleteWrapper'
import Button from 'components/ConstructorBtn'
import IngredientList from 'components/IngredientListGroup'
import Input from 'components/Input'

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

                const isGroupNameValid = !!elem.get('element')
                let areIngredientsValid = true
                const array = elem.get('recipe_ingredients').toJS()

                for (var i = 0; i < array.length; i++){
                    let el = array[i]

                    if(!(el.ingredient_id && el.amount && el.unit_id) && !el._destroy){
                        areIngredientsValid = false
                        break;
                    }
                }

                let isAnyIngredient = false
                if(array.find(elem => elem._destroy != true)){
                    isAnyIngredient = true
                }

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
                                isValid={isGroupNameValid && areIngredientsValid && isAnyIngredient}
                                value={elem.get('element')} 
                                placeholder='Основные'
                                stateUpdater={this.onNameChange}
                                updatePath={index}
                            />
                        </div>
                        <IngredientList
                            groupName={elem.get('element')}
                            groupPosition={elem.get('element_position')}
                            recipeId={this.props.recipeId}
                            data={elem.get('recipe_ingredients')}
                            units={this.props.units}
                            listType='groups'

                            stateUpdater={this.props.stateUpdater}
                            updatePath={index}
                        />
                    </SortDeleteWrapper>
                )
            }
        }
        ): []

        items = items.filter(elem => elem != undefined)

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
                <div className={`button-offset ${items.toJS().length? '': 'empty-list'}`}>
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
