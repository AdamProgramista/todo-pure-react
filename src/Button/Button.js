import React, { Component } from 'react';
import './Button.css';
import classNames from 'classnames';

export class Button extends Component {
  render() {
    return (
      <button
        className={classNames('btn', this.props.type)}
        type="submit"
        onClick={this.props.clickHandler}>
        {this.props.icon}</button>
    );
  }
}
