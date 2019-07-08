import React, { PureComponent } from "react";

import Check from 'components/Checkbox'

import Input from 'components/Input'

import 'styles/Timings.sass'

class Timings extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isChecked: false}
        this.onInput = this.onInput.bind(this)
        this.onHours = this.onHours.bind(this)
    }

    componentDidMount(){
        if (this.props.preparation_time){
            this.setState({isChecked: true})
        }
    }


    onHours(e){
        let value = e.target.value
        let minutes = this.props.cooking_time % 60
        this.props.stateUpdater(['cooking_time'], value * 60 + minutes)
    }


    // this implementation caused by the way data is stored in json
    onInput(field, valueObj) {
        const { onTimeChange, onPrepTimeChange, onServingsChange, stateUpdater } = this.props
        let data = this.props.data
        let value = valueObj.target.value

        let minutes = data.cooking_time % 60
        let preparationMinutes = data.preparation_time % 60

        switch (field) {
        case 'hours':
            this.props.stateUpdater(['cooking_time'], value * 60 + minutes)
            break;

        case 'minutes':
            this.props.stateUpdater(['cooking_time'], data.cooking_time + (value - minutes))
            break;

        case 'preparationHours':
            this.props.stateUpdater(['preparation_time'], value * 60 + preparationMinutes)
            break;

        case 'preparationMinutes':
            this.props.stateUpdater(['preparation_time'], data.preparation_time + (value - preparationMinutes))
            break;

        case 'servings':
            onServingsChange(value)
            break;

        default: console.error('Error in Timings component')
        }
    }

    // toggle preparation time collapsible
    onToggle(){
        if (this.state.isChecked){
            this.props.onPrepTimeChange(0)
            this.setState({isChecked: false})
        }
        else{
            this.setState({isChecked: true})
        }
    }



    render() {
        const { cooking_time, preparation_time, servings } = this.props

        // calculate hours and minutes
        let minutes = cooking_time % 60
        let hours = (cooking_time - minutes) / 60

        let preparationMinutes = preparation_time % 60
        let preparationHours = (preparation_time - preparationMinutes) / 60

        // to avoid to render '0' in input field when field should be empty
        minutes = minutes ? minutes : ''
        hours   = hours   ? hours   : ''

        preparationMinutes  = preparationMinutes  ? preparationMinutes  : ''
        preparationHours    = preparationHours    ? preparationHours    : ''

        return (
            <div className='timings-component'>
                <div className='outer-flex-container'>
                    <div>
                        <span className={'title' + (this.props.isValid? '': ' invalid')}>Время приготовления</span>

                        <div className={'input-timings-width timing-flex-container' + (this.props.isValid? '': ' invalid')}>
                            <div className='timing-clock-icon'/>
                            <Input 
                                className='text-input' 
                                type='number' 
                                value={hours} 
                                onChange={this.onHours} 
                                maxlength={2}
                            />
                            <span className='input-label'>часов</span>

                            <Input 
                                className='text-input' 
                                value={minutes} 
                                
                                maxlength={2}
                            />
                            <span className='input-label'>минут</span>
                        </div>
                    </div>
                    <div>
                        <span className={'title' + (this.props.isServingsValid? '': ' invalid')}>Количество персон </span>
                        <div className='input-portions-width timing-flex-container'>
                            <div className='timing-portions-icon' />
                            <Input 
                                value={servings} 
                                onChange={(e) => this.onInput('servings',e)}
                            />
                            <span className='input-label'>человек</span>
                        </div>
                    </div>
                </div>
                <div className='outer-flex-container'>
                    <div className='field_w260 preparation_check'>
                        <Check 
                            onToggle={() => this.onToggle()} 
                            isActive={this.state.isChecked} 
                            text='Требуется подготовка'
                        />
                    </div>
                    {this.state.isChecked ? (
                        <div className='preparation_time_container'>
                            <span className='title'>Время подготовки</span>
                            <div className='input-timings-width timing-flex-container'>
                                <div className='timing-clock-icon'/>
                                <Input 
                                    value={preparationHours} 
                                    onChange={(e) => this.onInput('preparationHours',e)}
                                />
                                <Input 
                                    value={preparationMinutes} 
                                    onChange={(e) => this.onInput('preparationMinutes',e)}
                                />
                            </div>
                        </div>
                    ): undefined
                    }
                </div>
            </div>
        );
    }
}
export default Timings;
