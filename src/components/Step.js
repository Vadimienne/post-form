import React, { PureComponent } from "react";

import Dropzone from 'components/Dropzone'
import Editor from 'components/MyEditorDescription'
import IngredientList from 'components/IngredientListStep'

import 'styles/Step.sass'

class Step extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        // const { image, body, step_ingredients } = this.props.data

        const image = this.props.data.get('image')
        const body = this.props.data.get('body')
        const step_ingredients = this.props.data.get('step_ingredients')

        return (
            <div className='step-presentational'>
                <Dropzone 
                    onChange={this.onFieldChange} 
                    data={image}
                />
                <div className='content-box__content' >
                    <Editor 
                        stateUpdater={this.props.stateUpdater}
                        stepIndex={this.props.stepIndex}
                        data={ body }
                    />
                    <span className='ingredients-label'>Укажите необходимые ингредиенты</span>
                    <IngredientList
                        data={step_ingredients}
                        units={this.props.units}
                        ingredientsAvailable={this.props.ingredientsAvailable}
                        listType='step'
                        stateUpdater={this.props.stateUpdater}
                        updatePath={this.props.stepIndex}
                    />
                </div>
            </div>
        );
    }
}
export default Step;
