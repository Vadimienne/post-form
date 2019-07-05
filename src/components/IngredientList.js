import React, { Component } from "react";
import { sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move'

import SortDeleteWrapperInline from 'components/SortDeleteWrapperInline'
import ConstructorBtn from 'components/ConstructorBtn'

import {clone} from 'helpers'

import 'styles/IngredientList.sass'

const SortableContainerIng = sortableContainer(({children}) => {
    return <ul>{children}</ul>;
});

class Ingredients extends Component {
    constructor(props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this)
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
        let array = clone(this.props.data)
        array = arrayMove (array, oldIndex, newIndex)
        this.props.onChange(array)
        //this.forceUpdate()
    }

    addIngredient(){
        let array = clone(this.props.data)
        if( this.props.listType==='groups'){
            array.push({
                amount: '',
                ingredient_id: '',
                position: array.length + 1,
                unit_id: '',
                ingredient: {
                    title: '',
                    id: '',
                    unit_ids: []
                },
            })
        }
        if( this.props.listType === 'step'){
            array.push({
                amount: '',
                ingredient_id: '',
                position: array.length + 1,
                unit_id: '',
            })
        }
        this.props.onChange(array)
    }

    removeIngredient(index){
        let array = clone(this.props.data)
        array.splice(index,1)
        this.props.onChange(array)
    }

    render() {

        // Ingredient component can be IngredientItemAsync or IngredientItemStep
        let Ingredient = this.props.ingredientItem


        // sort ingredients according to position property
        let sortedIngredients = this.props.data ? this.props.data.sort(
            (a, b) => {
                if (a.position < b.position){
                    return -1
                }
                if (a.position > b.position){
                    return 1
                }
                return 0
            }
        ): []


        // map ingredients
        let mappedIngredients = sortedIngredients.length ? sortedIngredients.map((elem, index) => (
            <SortDeleteWrapperInline className='sort-delete-wrapper-inline' index={index} key={'ingredient-sdw-'+index} onDelete={()=>this.removeIngredient(index)}>
                <Ingredient
                    groupInfo={this.props.groupInfo ? this.props.groupInfo : undefined}
                    recipeId={this.props.recipeId}
                    ingredientPosition={index + 1}
                    data={elem} 
                    key={'ingredient'+index}
                    units={this.props.units}
                    ingredientsAvailable={this.props.ingredientsAvailable ? this.props.ingredientsAvailable : undefined}
                    onChange={(value)=>this.onIngChange(index, value)}
                />
            </SortDeleteWrapperInline>)) : []

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
                        onClick={()=>this.addIngredient()}
                    />
                </div>
            </div>
        );
    }
}
export default Ingredients;
