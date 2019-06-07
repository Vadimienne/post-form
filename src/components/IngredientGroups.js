import React, { Component } from "react";
import ReactDOM from "react-dom";

import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import SortDeleteWrapper from 'components/SortDeleteWrapper'
import Button from 'components/ConstructorBtn'
import IngredientList from 'components/IngredientList'
import Input from 'components/Input'
import Ingredient from 'components/IngredientItemAsync'

import 'styles/IngredientGroups.sass'

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class IngedientGroup extends Component {
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onIngChange = this.onIngChange.bind(this)
    this.addGroup = this.addGroup.bind(this)
  }

  onSortEnd({oldIndex, newIndex}) {
    let array = this.props.data

    //sort array
    array = arrayMove(array, oldIndex, newIndex)

    //refresh array's position fields
    array = array.map((elem, index)=> {
      elem.position = index
      return elem
    })

    this.props.onChange(array)

    this.forceUpdate()
  }

  onIngChange(index, value){
    let array = this.props.data
    array[index].ingredients = value
    this.props.onChange(array)
  }

  onNameChange(e, index){
    let array = this.props.data
    array[index].title = e.target.value
    this.props.onChange(array)
  }


// #tofix add position
  addGroup(){
    let array = this.props.data
    array.push({title:'', recipe_ingredients:[{name:'',quantity:'', metric:''}]})
    this.props.onChange(array)
  }

  deleteGroup(index){
    let array = this.props.data
    array.splice(index,1)
    this.props.onChange(array)
  }

  render() {

    let items = this.props.data.map((elem, index)=> (
      <SortDeleteWrapper  name='Укажите ингредиенты' deleteDesc='Удалить подраздел'
        className='sort-delete-ingredients'
        index={index}
        key={`sortable-step-${index}`}
        idType='ingredients'
        onDelete={()=>this.deleteGroup(index)}>
        <div className='input-ingredient-group'>
          <Input  onChange={(e) => this.onNameChange(e, index)} value={elem.title} placeholder='Основные'/>
        </div>
        <IngredientList data={elem.ingredients} onChange={(val) => this.onIngChange(index, val)} ingredientItem={Ingredient}/>
      </SortDeleteWrapper>
    ))
    //idType props used to separate different groups of SortDeleteWrappers and make clickable labels for buttons
    console.log(items.length)

    return (
      <div className='ingredient-groups-component'>
        { items.length ?
        <SortableContainer useWindowAsScrollContainer onSortEnd={this.onSortEnd} useDragHandle lockAxis='y' key='sortable-container'>
          {items}
        </SortableContainer> : undefined}
        <div className='button-offset'>
          <Button onClick={this.addGroup} text='Добавить подраздел' icon='&#xea0c;' className='add-subsection'/>
        </div>
      </div>
    );
  }
}
export default IngedientGroup;
