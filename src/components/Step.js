import React, { PureComponent } from "react";

import Dropzone from 'components/Dropzon'
import Editor from 'components/MyEditorDescription'
import IngredientList from 'components/IngredientListStep'

import 'styles/Step.sass'

class Step extends PureComponent {
    constructor(props) {
        super(props);
    }

    // shouldComponentUpdate(nextProps){
    //     let oData = this.props.data
    //     let nData = nextProps.data
    //     let str = (a) => JSON.stringify(a)
    //     if(str(oData.toJS()) === str(nData.toJS())){
    //         return 0
    //     }
    //     console.log('STEP UPDATED')
    //     return 1
    // }

    render() {
        const { stepIndex } = this.props

        const stepId = this.props.data.get('id')
        const image = this.props.data.get('image')
        const body = this.props.data.get('body')
        const step_ingredients = this.props.data.get('step_ingredients')

        return (
            <div className='step-presentational'>
                <Dropzone 
                    data={image}
                    recipeId={this.props.recipeId}
                    stateUpdater={this.props.stateUpdater}
                    stepId={stepId}
                    stepIndex={this.props.stepIndex}
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
