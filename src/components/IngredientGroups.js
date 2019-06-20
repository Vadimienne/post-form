import React, { Component } from "react";

import { sortableContainer } from 'react-sortable-hoc';
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

    shouldComponentUpdate(nextProps){
    // console.log(this.props)
    // return true

        console.log('/////////////////////////////')
        console.log(JSON.stringify(this.props.data[0].recipe_ingredients[0]), JSON.stringify(this.props.data[0].recipe_ingredients[1]))
        console.log(JSON.stringify(nextProps.data[0].recipe_ingredients[0]), JSON.stringify(nextProps.data[0].recipe_ingredients[1]))
        if(JSON.stringify(this.props) === JSON.stringify(nextProps)){
            return false
        }
        else {
            return true
        }
    }

    onSortEnd({oldIndex, newIndex}) {
        let array = [...this.props.data]

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
        let array = JSON.parse(JSON.stringify(this.props.data))
        array[index].recipe_ingredients = value
        this.props.onChange(array)
    }

    onNameChange(e, index){
        let array = [...this.props.data]
        array[index].element = e.target.value
        this.props.onChange(array)
    }


    // #tofix add position
    addGroup(){
        let array = [...this.props.data]
        array.push({element:'', recipe_ingredients:[]})
        this.props.onChange(array)
    }

    deleteGroup(index){
        let array = [...this.props.data]
        array.splice(index,1)
        this.props.onChange(array)
    }

    render() {
        let items = this.props.data? this.props.data.map((elem, index)=> (
            <SortDeleteWrapper
                name='Укажите ингредиенты' deleteDesc='Удалить подраздел'
                className='sort-delete-ingredients'
                index={index}
                key={`sortable-step-${index}`}
                idType='ingredients'
                onDelete={()=>this.deleteGroup(index)}>
                <div className='input-ingredient-group'>
                    <Input  onChange={(e) => this.onNameChange(e, index)} value={elem.element} placeholder='Основные'/>
                </div>
                {!this.props.isValid? (<span className='ingredients-validation-warning'>Необходимо указать хотя бы один ингредиент</span>): undefined}
                <IngredientList
                    data={[...elem.recipe_ingredients]}
                    units={this.props.units}
                    onChange={(val) => this.onIngChange(index, val)}
                    ingredientItem={Ingredient}
                    listType='groups'
                />
            </SortDeleteWrapper>
        )): []
        //idType props used to separate different groups of SortDeleteWrappers and make clickable labels for buttons
        //console.log(items.length)

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
