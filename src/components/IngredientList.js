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

    componentDidMount(){
        let array = clone(this.props.data)

        //refresh array's position fields
        console.log('sorting array BEF: ',array.map((elem) => elem.position))
        array = array.sort(
            (a, b) => {
                if (a.position < b.position){
                    return -1
                }
                if (a.position > b.position){
                    return 1
                }
                return 0
            }
        )
        console.log('sorting array AFT: ',array.map((elem) => elem.position))
        console.log('——————————————————————————————————————————————————————————')
        this.props.onChange(array)
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
        console.log(array[0].ingredient.title, array[0].position)

        array = arrayMove (array, oldIndex, newIndex)
        console.log(array[0].ingredient.title, array[0].position)

        //refresh array's position fields
        array = array.map((elem, index)=> {
            elem.position = index + 1
            return elem
        })
        console.log(array[0].ingredient.title, array[0].position)
        this.props.onChange(array)
        this.forceUpdate()
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
        //array.splice(index,1)
        array[index]._destroy = true
        array[index].destroy = true
        console.log('anis: ', array[index])
        this.props.onChange(array)
    }

    render() {

        // Ingredient component can be IngredientItemAsync or IngredientItemStep
        let Ingredient = this.props.ingredientItem

        let cloned = this.props.data? clone(this.props.data) : []
        // sort ingredients according to position property
        /* let sortedIngredients = cloned.length ? cloned.sort(
            (a, b) => {
                if (a.position < b.position){
                    return -1
                }
                if (a.position > b.position){
                    return 1
                }
                return 0
            }
        ): [] */
        
        /* if ( this.props && this.props.groupInfo &&sortedIngredients.length && this.props.groupInfo.element_position == 1) {
            console.log('sortedIngredients ',sortedIngredients[0].position, sortedIngredients[1].position,
                sortedIngredients[2].position, sortedIngredients[3].position, sortedIngredients[4].position)
            console.log('sortedIngredients ',sortedIngredients[0].ingredient_id, sortedIngredients[1].ingredient_id,
                sortedIngredients[2].ingredient_id, sortedIngredients[3].ingredient_id, sortedIngredients[4].ingredient_id)
        } */


        // map ingredients
        let mappedIngredients = cloned.length ? cloned.map((elem, index) => (
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
