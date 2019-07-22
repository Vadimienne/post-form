import React, { PureComponent } from "react";
import { sortableContainer } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'helpers'

import SortDeleteWrapperInline from 'components/SortDeleteWrapperInline'
import ConstructorBtn from 'components/ConstructorBtn'
import Ingredient from 'components/IngredientItemStep'

import 'styles/IngredientList.sass'
import Immutable, { Map, fromJS } from "immutable";

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
    
    // triggers when sort-button is released
    onSortEnd({oldIndex, newIndex}){
        this.props.stateUpdater(
            ['recipe_steps', this.props.updatePath, 'step_ingredients'], 
            arrayMoveImmutable(this.props.data, oldIndex, newIndex)
        )
    }

    addIngredient(){
        let array = this.props.data
        this.props.stateUpdater(['recipe_steps', this.props.updatePath, 'step_ingredients', array.size],
            fromJS(
                {
                    amount: '',
                    ingredient_id: '',
                    position: array.length + 1,
                    unit_id: ''
                }
            )
        )
    }

    removeIngredient(index){
        this.props.stateUpdater(['recipe_steps', this.props.updatePath, 'step_ingredients', index, '_destroy' ], true)
    }

    render() {

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
                            amount = {elem.get('amount')}
                            recipeIngredientId = {elem.get('recipe_ingredient_id')}
                            key={'ingredient'}
                            units={this.props.units}
                            ingredientsAvailable={this.props.ingredientsAvailable}
                            
                            stateUpdater={this.props.stateUpdater}
                            stepIndex={this.props.updatePath}
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
