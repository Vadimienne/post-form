import React, { Component } from "react";

import Dropzone from 'components/Dropzone'
import Editor from 'components/MyEditorDescription'
import IngredientList from 'components/IngredientList'
import IngredientItem from 'components/IngredientItemStep'

import {clone} from 'helpers'

import 'styles/Step.sass'

class Step extends Component {
    constructor(props) {
        super(props);
        this.onFieldChange = this.onFieldChange.bind(this)
    }

    shouldComponentUpdate(nextProps){
        if(JSON.stringify(this.props) === JSON.stringify(nextProps)){
            return false
        }
        else {
            return true
        }
    }

    onFieldChange(field, val) {
        let data = clone(this.props.data)
        data[field] = val
        this.props.onChange(data)
    }

    render() {
        const { image, body, step_ingredients } = this.props.data

        return (
            <div className='step-presentational'>
                <Dropzone onChange={(val) => this.onFieldChange('image', val)} data={image}/>
                <div className='content-box__content' >
                    <Editor onChange={(val) => this.onFieldChange('body', val)} data = {body}/>
                    <span className='ingredients-label'>Укажите необходимые ингредиенты</span>
                    <IngredientList
                        data={step_ingredients}
                        units={this.props.units}
                        ingredientsAvailable={this.props.ingredientsAvailable}
                        onChange={(val) => this.onFieldChange('step_ingredients', val)}
                        ingredientItem={IngredientItem}
                        listType='step'
                    />
                </div>
            </div>
        );
    }
}
export default Step;
