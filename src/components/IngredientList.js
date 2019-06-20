import React, { Component } from "react";
import { sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move'

import SortDeleteWrapperInline from 'components/SortDeleteWrapperInline'
import ConstructorBtn from 'components/ConstructorBtn'

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
        if (this.props.data.length ==  8){
            //console.log(this.props.data)
            let data = [...this.props.data]
            data.splice(1,1)
        }

    }

    onIngChange(index, value){
        let data = [...this.props.data]
        data[index] = value
        this.props.onChange(data)
    }

    //#tofix refresh positions in array
    onSortEnd({oldIndex, newIndex}){
        let array = JSON.parse(JSON.stringify(this.props.data))
        array = arrayMove (array, oldIndex, newIndex)
        this.props.onChange(array)
        this.forceUpdate()
    }

    //#tofix add position
    addIngredient(){
        let array = [...this.props.data]
        if( this.props.listType==='groups'){
            array.push({
                amount: '',
                ingredient_id: '',
                position: '',
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
                position: '',
                unit_id: '',
            })
        }
        this.props.onChange(array)
    }

    removeIngredient(index){
        let array = [...this.props.data]
        //array.splice(index,1)
        let filtered = array.filter((el, i)=> index!==i)
        this.props.onChange(filtered)
        filtered = array.filter((el, i)=> 0!==i)
    //array.splice(0,1)
    }

    render() {
        let Ingredient = this.props.ingredientItem
        let mappedIngredients = this.props.data ? this.props.data.map((elem, index) => (
            <SortDeleteWrapperInline className='sort-delete-wrapper-inline' index={index} key={'ingredient-sdw-'+index} onDelete={()=>this.removeIngredient(index)}>
                <Ingredient
                    data={elem} key={'ingredient'+index}
                    units={this.props.units}
                    ingredientsAvailable={this.props.ingredientsAvailable ? this.props.ingredientsAvailable : undefined}
                    onChange={(value)=>this.onIngChange(index, value)}
                />
            </SortDeleteWrapperInline>)) : []

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
