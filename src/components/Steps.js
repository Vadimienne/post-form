import React, { PureComponent } from "react";

import { sortableContainer } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'helpers';
import { fromJS } from 'immutable'

import SortDeleteWrapper from 'components/SortDeleteWrapper'
import Step from 'components/Step'
import Button from 'components/ConstructorBtn'

const SortableContainer = sortableContainer(({children}) => {
    return <ul>{children}</ul>;
});

class Steps extends PureComponent {
    constructor(props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this)
        this.addStep = this.addStep.bind(this)
        this.deleteStep = this.deleteStep.bind(this)
    }

    // triggers when sort-button is released
    onSortEnd({oldIndex, newIndex}){
        this.props.stateUpdater(
            ['recipe_steps'], 
            arrayMoveImmutable(this.props.data, oldIndex, newIndex)
        )
    }

    addStep(){
        let array = this.props.data
        array = array.push(
            fromJS(
                {
                    image: '',
                    body: '',
                    step_ingredients: []
                }
            )
        )
        this.props.stateUpdater(['recipe_steps'], array)

    }

    deleteStep(index){
        this.props.stateUpdater(['recipe_steps', index, '_destroy'], true)
    }

    render() {
        let stepEnumeration = 1
        let items = this.props.data ? this.props.data.map((elem, index)=> {
            if (elem.get('_destroy') !== true) {
                return(
                    <SortDeleteWrapper
                        name={`${stepEnumeration++} шаг`}
                        deleteDesc='Удалить шаг'
                        className='content-box sort-delete-steps'
                        index={index}
                        key={'sortable-step-'+index}
                        onDelete={this.deleteStep}>
                        <Step
                            recipeId={this.props.recipeId}
                            data={elem}
                            units={this.props.units}
                            ingredientsAvailable={this.props.ingredientsAvailable}
                            stateUpdater={this.props.stateUpdater}
                            stepIndex={index}
                            key={'sortable-step__step-'+index}
                        />
                    </SortDeleteWrapper>
                )
            }
        }
        ): []

        return (
            <>
                <SortableContainer 
                    useWindowAsScrollContainer 
                    onSortEnd={this.onSortEnd} 
                    useDragHandle 
                    lockAxis='y' 
                    key='sortable-container'
                >
                    {items}
                </SortableContainer>
                {
                    !this.props.isValid? 
                        <span className='step-validation-warning'>
                            <div className='warning-icon'>&#xea3a;</div>
                            Нужно указать хотя бы один шаг
                        </span>
                        : undefined
                }
                <Button 
                    onClick={this.addStep} 
                    text='Добавить шаг' 
                    className='add-step-button'  
                    icon='&#xea0d;'
                />
            </>
        );
    }
}
export default Steps;
