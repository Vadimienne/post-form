import React, { Component } from "react";
import ReactDOM from "react-dom";

import Select from 'react-select'

class Tags extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const options = [
      {
        label:'chicken', value:'chicken'
      },
      {
        label:'apple', value:'apple'
      },
      {
        label:'mushroom', value:'mushroom'
      }
    ]

    return (
      <>
        <Select options={options} isSearchable/>
      </>
    );
  }
}
export default Tags;
