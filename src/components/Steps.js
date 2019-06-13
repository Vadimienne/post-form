import React, { Component } from "react";
import ReactDOM from "react-dom";

import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import SortDeleteWrapper from 'components/SortDeleteWrapper'
import Step from 'components/Step'
import Button from 'components/ConstructorBtn'

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class Steps extends Component {
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this)
    this.onStepChange = this.onStepChange.bind(this)
    this.addStep = this.addStep.bind(this)
  }

  onSortEnd({oldIndex, newIndex}){
    let array = this.props.data
    array = arrayMove(array, oldIndex, newIndex)
    this.props.onChange(array)
    this.forceUpdate()
  }

  onStepChange(index, value) {
    let array = this.props.data
    array[index] = value
    this.props.onChange(array)
  }

  addStep(){
    let array = this.props.data
    array.push({
      image: {url:''},
      description: '',
      ingredients: [
        {
          name: '',
          quantity: '',
          metric: 'шт.'
        },
      ]
    })
    this.props.onChange(array)
  }

  deleteStep(index){
    let array = this.props.data
    console.log('array')
    console.log(array)
    array.splice(index,1)
    this.props.onChange(array)
  }

  render() {

    let items = this.props.data? this.props.data.map((elem, index)=> (
        <SortDeleteWrapper name={`${index + 1} шаг`}
          deleteDesc='Удалить шаг'
          className='content-box sort-delete-steps'
          index={index}
          key={'sortable-step-'+index}
          onDelete={()=>this.deleteStep(index)}>
          <Step
            data={elem}
            units={this.props.units}
            ingredientsAvailable={this.props.ingredientsAvailable}
            onChange={(val) => this.onStepChange(index, val)}
          />
        </SortDeleteWrapper>
    )): []

    return (
      <>
        <SortableContainer useWindowAsScrollContainer onSortEnd={this.onSortEnd} useDragHandle lockAxis='y' key='sortable-container'>
          {items}
        </SortableContainer>
        <Button onClick={this.addStep} text='Добавить шаг' className='add-step-button'  icon='&#xea0d;'/>
      </>
    );
  }
}
export default Steps;
