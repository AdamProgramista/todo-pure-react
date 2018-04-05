import React, { Component } from 'react';
import './Button.css';

export class Button extends Component {

  render() {
    return (
      <button
        className={`btn ${this.props.classExtra}`}
        type="submit"
        onClick={this.props.clickHandler}>
        {this.props.icon}</button>
    );
  }
}
