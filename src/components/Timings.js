import React, { Component } from "react";
import ReactDOM from "react-dom";

import Check from 'components/Checkbox'

import Input from 'components/Input'

import 'styles/Timings.sass'

class Timings extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: (parseInt(props.data.preparationHours) || parseInt(props.data.preparationMinutes))}
    this.onInput = this.onInput.bind(this)
  }

  onInput(field, value) {
    let data = this.props.data
    data[field] = value.target.value
    this.props.onChange(data)
  }

  onToggle(){
    if (this.state.isChecked){
      let data = this.props.data
      data.preparationHours = '0'
      data.preparationMinutes = '0'
      this.props.onChange(data)
    }
    this.setState({isChecked: !this.state.isChecked})
  }

  render() {
    const { isChecked } = this.state
    const { hours, minutes, portions, preparationHours, preparationMinutes } = this.props.data
    return (
      <div className='timings-component'>
        <div className='outer-flex-container'>
          <div>
              <span className='title'>Время приготовления</span>

              <div className='input-timings-width timing-flex-container'>
                <div className='timing-clock-icon'/>
                <Input className='text-input' type='number' value={hours} onChange={(e) => this.onInput('hours',e)} maxlength={2}/>
                <span className='input-label'>часов</span>
                <Input className='text-input' value={minutes} onChange={(e) => this.onInput('minutes',e)} maxlength={2}/>
                <span className='input-label'>минут</span>
              </div>
            </div>
            <div>
              <span className='title'>Количество персон </span>
              <div className='input-portions-width timing-flex-container'>
                <div className='timing-portions-icon' />
                <Input value={portions} onChange={(e) => this.onInput('portions',e)}/>
                <span className='input-label'>человек</span>
              </div>
            </div>
          </div>
              <div className='outer-flex-container'>
              <div className='field_w260'>
              <Check onToggle={() => this.onToggle()} isActive={isChecked} text='Требуется подготовка'/>
              </div>
              {isChecked? (
                <div>
                  <span className='title'>Время подготовки</span>
                  <div className='input-timings-width timing-flex-container'>
                    <div className='timing-clock-icon'/>
                    <Input value={preparationHours} onChange={(e) => this.onInput('preparationHours',e)}/>
                    <span className='input-label'>часов</span>
                    <Input value={preparationMinutes} onChange={(e) => this.onInput('preparationMinutes',e)}/>
                    <span className='input-label'>минут</span>
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
