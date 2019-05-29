import React, { Component } from "react";
import ReactDOM from "react-dom";

import Check from 'components/Checkbox'

import 'styles/CollapsibleCheckboxes.sass'

class CollapsibleCheckboxes extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen:true}
  }

  toggleCheck(index){
    let data = this.props.data
    data.boxes[index].isChecked = !data.boxes[index].isChecked
    this.props.onChange(data)
  }

  render() {
    const { head, boxes } = this.props.data

    let checkboxes = boxes.map((elem, index) => <div><Check isActive={elem.isChecked}  onToggle={()=> this.toggleCheck(index)}/> <span>{elem.name}</span> </div>)

    return (
      <div className='checkboxes-component'>
        <span onClick={() => this.setState({isOpen: !this.state.isOpen})}>{head}</span>
        <div className={'checkboxes-list' + (this.state.isOpen? '': ' closed')}>
          {checkboxes}
        </div>
      </div>
    );
  }
}
export default CollapsibleCheckboxes;
