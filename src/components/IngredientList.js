import React, { Component } from "react";
import ReactDOM from "react-dom";
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move'

import DragButton from 'components/DragButton'
import TrashCanButton from 'components/TrashCanButton'
//import Ingredient from 'components/IngredientItem'
import SortDeleteWrapperInline from 'components/SortDeleteWrapperInline'
import ConstructorBtn from 'components/ConstructorBtn'

import AddBtn from 'images/addIcon.png'

import 'styles/IngredientList.sass'

const SortableContainerIng = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class Ingredients extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if(!this.props.data){
      this.props.onChange([])
    }
  }

  onIngChange(index, value){
    let data = this.props.data
    data[index] = value
    this.props.onChange(data)
  }

//#tofix refresh positions in array
  onSortEnd({oldIndex, newIndex}){
    let array = this.props.data
    array = arrayMove (array, oldIndex, newIndex)
    this.props.onChange(array)
    this.forceUpdate()
  }

//#tofix add position
  addIngredient(){
    let array = this.props.data
    array.push({name:'',quantity:'', metric:''})
    this.props.onChange(array)
  }

  removeIngredient(index){
    let array = this.props.data
    array.splice(index,1)
    this.props.onChange(array)
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
        <SortableContainerIng onSortEnd={(payload)=> this.onSortEnd(payload)} useDragHandle lockAxis='y'>
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
