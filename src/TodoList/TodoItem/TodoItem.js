import React from 'react';
import '../TodoAll.css';
import { Button } from '../../Button/Button.js'
import { FaMinus, FaPencil, FaCheck, FaArrowRight, FaArrowLeft } from 'react-icons/lib/fa';

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      currentId: this.props.todo.id,
      currentText: this.props.todo.text
    }
  }
  
  openModifyTodo = () => {
    this.setState({
      editing: true,
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
    })
  }
  
 render(){
    const arrowRight = this.props.progressArrow;
    const arrowLeft = this.props.regressArrow;

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
        type="btn-ok"
        icon={<FaCheck />}/>
      </div>
      )
    } else {
      return (
        <div className="todo-item">
          <span className="todo-item-text">{this.props.todo.text}</span>
          <Button
            clickHandler={this.openModifyTodo}
            type="btn-edit"
            icon={<FaPencil />}/>
          {arrowRight ? <Button
            clickHandler={this.props.progressMove}
            type="btn-arrow"
            icon={<FaArrowRight />}/> : null}
          {arrowLeft ? <Button
            clickHandler={this.props.regressMove}
            type="btn-arrow"
            icon={<FaArrowLeft />}/> : null}
          <Button 
            clickHandler={this.props.removeTodo}
            type="btn-delete"
            icon={<FaMinus />}/>
        </div>
    )}
  }
}
