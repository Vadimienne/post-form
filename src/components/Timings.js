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
      <>
        <div className='timing-clock-icon'/>
        <div className='input-timings-width'>
          <Input className='text-input' type='number' value={hours} onChange={(e) => this.onInput('hours',e)} maxlength={2}/>
          <Input value={minutes} onChange={(e) => this.onInput('minutes',e)} maxlength={2}/>
        </div>
        <div className='timing-portions-icon' />
        <div className='input-portions-width'>
          <Input value={portions} onChange={(e) => this.onInput('portions',e)}/>
        </div>
        <Check onToggle={() => this.onToggle()} isActive={isChecked}/>
        {isChecked? (
          <>
          <div className='timing-clock-icon'/>
          <div className='input-timings-width'>
            <Input value={preparationHours} onChange={(e) => this.onInput('preparationHours',e)}/>
            <Input value={preparationMinutes} onChange={(e) => this.onInput('preparationMinutes',e)}/>
          </div>
          </>
        ): ''
        }
      </>
    );
  }
}
export default Timings;
