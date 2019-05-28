import React, { Component } from "react";
import ReactDOM from "react-dom";

import Check from 'components/Checkbox'

class Timings extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: (props.data.preparationHours || props.data.preparationMinutes)}
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
        <input type='number' value={hours} onChange={(e) => this.onInput('hours',e)}/>
        <input value={minutes} onChange={(e) => this.onInput('minutes',e)}/>
        <input value={portions} onChange={(e) => this.onInput('portions',e)}/>
        <Check onToggle={() => this.onToggle()}/>
        {isChecked? (
          <>
          <input value={preparationHours} onChange={(e) => this.onInput('preparationHours',e)}/>
          <input value={preparationMinutes} onChange={(e) => this.onInput('preparationMinutes',e)}/>
          </>
        ): ''
        }
      </>
    );
  }
}
export default Timings;
