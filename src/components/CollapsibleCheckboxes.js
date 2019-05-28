import React, { Component } from "react";
import ReactDOM from "react-dom";

class CollapsibleCheckboxes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { head, boxes } = this.props.data

    let checkboxes = this.

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
