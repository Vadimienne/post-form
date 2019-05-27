import React, { Component } from "react";
import ReactDOM from "react-dom";
class Main extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <form id="article-form">
      </form>
    );
  }
}
export default Main;

const wrapper = document.getElementById("post-form");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;
