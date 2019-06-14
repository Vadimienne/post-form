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
    const { head, tags, checked } = this.props

    let checkboxes = tags.map((elem, index) => (

        <Check key={'checkbox-'+index} isActive={(checked.includes(elem.id)? true: false)} text={elem.name} onToggle={()=> this.toggleCheck(index)}/>


    ))

    return (
      <div className='checkboxes-component'>
        <span className={"list-name" + (this.state.isOpen? '': ' closed')} onClick={() => this.setState({isOpen: !this.state.isOpen})}>{head}</span>
        <div className={'checkboxes-list ' + (this.state.isOpen? '': ' closed')}>
          {checkboxes}
        </div>
      </div>
    );
  }
}
export default CollapsibleCheckboxes;
