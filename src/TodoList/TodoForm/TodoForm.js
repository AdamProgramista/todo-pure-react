import React, { Component } from 'react';
import '../TodoAll.css';
import { Button } from '../Button/Button.js'
import { FaPlus } from 'react-icons/lib/fa';

export class TodoForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todoContent: '',
			todoStatus: ''
		} 
	}
	
	textHandler = (event) => {
		const writtenText = event.target.value;
		this.setState({
			todoContent: writtenText,
			todoStatus: this.props.todoStatus
		});
	}
	
	confirmTodoHandler = () => {
		if (this.state.todoContent.length > 0){
			this.props.addTodoHandler(this.state);
			this.clearTodoState();
		} 
	}
	
	clearTodoState = () => {
		this.setState ({
			todoContent: '',
		})
	}
	
	render() {
		return (
			<div className="todo-form">
				<input
					type="text"
					className="todo-input"
					onChange={this.textHandler}
					value={this.state.todoContent}
					placeholder={this.props.placeholder} />
				<Button
					icon={<FaPlus />}
					classExtra="btn-add"
					clickHandler={this.confirmTodoHandler}/>
			</div>
		);
	}
}
