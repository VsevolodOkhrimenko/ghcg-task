import React, { Component } from "react";
import './Loader.scss'

export default class Loader extends Component {
  render() {
    return (
      <div id="genericLoader" className="loader-container">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
}
