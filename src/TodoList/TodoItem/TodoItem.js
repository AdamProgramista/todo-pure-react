import React from 'react';
import '../TodoAll.css';
import { Button } from '../Button/Button.js'
import { FaMinus, FaArrowRight, FaArrowLeft, FaPencil, FaCheck } from 'react-icons/lib/fa';

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      currentId: 0,
      currentText: ''
    }
  }
  
  openModifyTodo = (id, text) => {
    this.setState({
      editing: true,
      currentId: id,
      currentText: text
    });
  }
  
  modifyTodoHandler = (event) => {
    const writtenText = event.target.value;
    this.setState({
      currentText: writtenText,
    });
    }
  
  confirmModifyTodoHandler = () => {
    const {currentId, currentText} = this.state;
    if (this.state.currentText.length > 0){
      this.props.modifyTodo(currentId, currentText);
      this.closeModifyTodo();
    }
  }
  
  closeModifyTodo = () => {
    this.setState({
      editing: false,
      currentId: 0,
      currentText: ''
    })
  }
  
 render(){
    const arrow = this.props.getArrowButton;
    const status = this.props.todoStatus;
    const todo = this.props.todo;
    const {id, text} = todo;

   if(this.state.editing) {
      return(
        <div className="todo-item">
          <input
          type="text"
          className="todo-input"
          onChange={this.modifyTodoHandler}
          value={this.state.currentText}/>
          <Button
          clickHandler={this.confirmModifyTodoHandler}
          classExtra="btn-check"
          icon={<FaCheck />}/>
        </div>
      )
    } else {
      return (
        <div className="todo-item">
          <span className="todo-item-text">{text}</span>
          <Button
            clickHandler={() => this.openModifyTodo(id, text)}
            classExtra="btn-edit"
            icon={<FaPencil />}/>
          <Button
            clickHandler={() => this.props.changeTodoPlace(id, text, status)}
            classExtra="btn-arrow"
            icon={arrow} />
          <Button 
            clickHandler={() => this.props.removeTodo(id)}
            classExtra="btn-delete"
            icon={<FaMinus />}/>
        </div>
    )}
  }
}
