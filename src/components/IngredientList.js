import React, { PureComponent } from "react";
import { sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move'
import { arrayMoveImmutable } from 'helpers'

import SortDeleteWrapperInline from 'components/SortDeleteWrapperInline'
import ConstructorBtn from 'components/ConstructorBtn'

import 'styles/IngredientList.sass'
import { Map, fromJS } from "immutable";

const SortableContainerIng = sortableContainer(({children}) => {
    return <ul>{children}</ul>;
});

class Ingredients extends PureComponent {
    constructor(props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this)
        this.removeIngredient = this.removeIngredient.bind(this)
        this.addIngredient = this.addIngredient.bind(this)
    }

    // send ingredient changes to state
    onIngChange(index, value){
        let data = clone(this.props.data)
        data[index] = value
        this.props.onChange(data)
    }

    //#tofix refresh positions in array
    // triggers when sort-button is released
    onSortEnd({oldIndex, newIndex}){
        this.props.stateUpdater(
            ['ingredient_groups', this.props.updatePath, 'recipe_ingredients'], 
            arrayMoveImmutable(this.props.data, oldIndex, newIndex)
        )
    }

    addIngredient(){
        let array = this.props.data

        console.log('ADDIN ING BEACH')
        if( this.props.listType==='groups'){
            this.props.stateUpdater(['ingredient_groups', this.props.updatePath, 'recipe_ingredients', array.size], 
                fromJS(
                    {
                        amount: '',
                        ingredient_id: '',
                        position: array.size + 1,
                        unit_id: '',
                        ingredient: {
                            title: '',
                            id: '',
                            unit_ids: []
                        },
                    }
                )
            )
        }
        if( this.props.listType === 'step'){
            array = array.push(
                Map(
                    {
                        amount: '',
                        ingredient_id: '',
                        position: array.length + 1,
                        unit_id: '',
                    }
                )
            )
            this.props.onChange()
        }
    }

    removeIngredient(index){
        this.props.stateUpdater(['ingredient_groups', this.props.updatePath, 'recipe_ingredients', index, '_destroy' ], true)
    }

    render() {

        
        let Ingredient = this.props.ingredientItem

        // map ingredients without destroyed ones
        let mappedIngredients = this.props.data.size ? this.props.data.map((elem, index) => {
            if( elem.get('_destroy') !== true ) {
                return (
                    <SortDeleteWrapperInline className='sort-delete-wrapper-inline' index={index} key={'ingredient-sdw-'+index} onDelete={this.removeIngredient}>
                        <Ingredient
                            groupName={this.props.groupName}
                            groupPosition={this.props.groupPosition}
                            recipeId={this.props.recipeId}
                            ingredientPosition={index}
                            data={elem} 
                            key={'ingredient'}
                            units={this.props.units}
                            
                            stateUpdater={this.props.stateUpdater}
                            groupIndex={this.props.updatePath}
                            updatePath={index}
                        />
                    </SortDeleteWrapperInline>
                )
            }
            else { 
                return undefined
            }
        }) : []

        // render
        return (
            <div className='ingredient-list-component'>
                <SortableContainerIng onSortEnd={this.onSortEnd} useDragHandle lockAxis='y'>
                    {mappedIngredients}
                </SortableContainerIng>
                <div className='constructor-button-offset'>
                    <ConstructorBtn
                        icon='&#xea0d;'
                        text='Добавить ингредиент'
                        onClick={this.addIngredient}
                    />
                </div>
            </div>
        );
    }
}
export default Ingredients;
