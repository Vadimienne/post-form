import React, { PureComponent } from "react";

import Check from 'components/Checkbox'

import Input from 'components/Input'

import 'styles/Timings.sass'

class Timings extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isChecked: false}
        /* this.onHours = this.onHours.bind(this)
        this.onMinutes = this.onMinutes.bind(this)
        this.onPrepHours = this.onPrepHours.bind(this)
        this.onPrepMinutes = this.onPrepMinutes.bind(this)
        this.onServings = this.onServings.bind(this) */
        this.onToggle = this.onToggle.bind(this)
        this.localStateUpdater = this.localStateUpdater.bind(this)
    }

    componentDidMount(){
        if (this.props.preparation_time){
            this.setState({isChecked: true})
        }
    }

    // this implementation caused by the way data is stored in json

    /* onHours(e){
        let value = e.target.value
        let minutes = this.props.cooking_time % 60
        this.props.stateUpdater(['cooking_time'], value * 60 + minutes)
    }

    onMinutes(e){
        let value = e.target.value
        let ct = this.props.cooking_time
        let minutes = ct % 60
        this.props.stateUpdater(['cooking_time'], ct + (value - minutes))
    }

    onPrepHours(e){
        let value = e.target.value
        let preparationMinutes = this.props.preparation_time % 60
        this.props.stateUpdater(['preparation_time'], value * 60 + preparationMinutes)
    }

    onPrepMinutes(e){
        let value = e.target.value
        let pt = this.props.preparation_time

        let preparationMinutes = pt % 60
        this.props.stateUpdater(['preparation_time'], pt + (value - preparationMinutes))
    }

    onServings(e){
        this.props.stateUpdater(['servings'], e.target.value)
    } */


    // toggle preparation time collapsible
    onToggle(){
        if (this.state.isChecked){
            this.props.stateUpdater(['preparation_time'], 0)
            this.setState({isChecked: false})
        }
        else{
            this.setState({isChecked: true})
        }
    }

    localStateUpdater(path, value){
        let ct = this.props.cooking_time
        let pt = this.props.preparation_time
        let minutes = ct % 60
        let preparationMinutes = pt % 60
        switch (path) {
            case 'cooking_hours':
                this.props.stateUpdater(['cooking_time'], value * 60 + minutes)
                break;
            
            case 'cooking_minutes':
                this.props.stateUpdater(['cooking_time'], ct + (value - minutes))
                break;

            case 'prep_hours':
                this.props.stateUpdater(['preparation_time'], value * 60 + preparationMinutes)
                break;

            case 'prep_minutes':
                this.props.stateUpdater(['preparation_time'], pt + (value - preparationMinutes))
                break;

            case 'servings':
                this.props.stateUpdater(['servings'], value)
                break;
            default:
                console.log('something went wrong in localStateUpdater. Check Timings.js')
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
                        <span className={'title' + (this.props.isValid? '': ' invalid')}>
                            <div className='warning-icon'>&#xea3a;</div>
                            Время приготовления
                        </span>

                        <div className={'input-timings-width timing-flex-container' + (this.props.isValid? '': ' invalid')}>
                            <div className='timing-clock-icon'/>
                            <Input 
                                className='text-input' 
                                type='number' 
                                value={hours}  
                                maxlength={2}
                                stateUpdater={this.localStateUpdater}
                                updatePath='cooking_hours'
                            />
                            <span className='input-label'>часов</span>

                            <Input 
                                className='text-input' 
                                type='number'
                                value={minutes} 
                                onChange={this.onMinutes}
                                maxlength={2}
                                stateUpdater={this.localStateUpdater}
                                updatePath='cooking_minutes'
                            />
                            <span className='input-label'>минут</span>
                        </div>
                    </div>
                    <div>
                        <span className={'title' + (this.props.isServingsValid? '': ' invalid')}>
                            <div className='warning-icon'>&#xea3a;</div>
                            Количество персон 
                        </span>
                        <div className='input-portions-width timing-flex-container'>
                            <div className='timing-portions-icon' />
                            <Input 
                                value={servings} 
                                onChange={this.onServings}
                                stateUpdater={this.localStateUpdater}
                                updatePath='servings'
                            />
                            <span className='input-label'>человек</span>
                        </div>
                    </div>
                </div>
                <div className='outer-flex-container'>
                    <div className='field_w260 preparation_check'>
                        <Check 
                            className='title'
                            stateUpdater={this.onToggle} 
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
                                    onChange={this.onPrepHours}
                                    stateUpdater={this.localStateUpdater}
                                    updatePath='prep_hours'
                                />
                                <Input 
                                    value={preparationMinutes} 
                                    onChange={this.onPrepMinutes}
                                    stateUpdater={this.localStateUpdater}
                                    updatePath='prep_minutes'
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
