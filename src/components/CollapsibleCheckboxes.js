import React, { Component } from "react";
import ReactDOM from "react-dom";

import Check from 'components/Checkbox'

class CollapsibleCheckboxes extends Component {
  constructor(props) {
    super(props);
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
      <>
        <span>{head}</span>
        <div>
          {checkboxes}
        </div>
      </>
    );
  }
}
export default CollapsibleCheckboxes;
