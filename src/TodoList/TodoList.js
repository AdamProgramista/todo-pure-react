import React, { Component } from 'react';
import './TodoAll.css';
import { TodoForm } from './TodoForm/TodoForm.js'
import { TodoItem } from './TodoItem/TodoItem.js'
import { FaArrowRight, FaArrowLeft } from 'react-icons/lib/fa';

export class TodoList extends Component {
    constructor(props) {
    super(props);
  }  
    
  getArrowButton = (todoStatus) => {
    if (todoStatus === 'To do'){
      return <FaArrowRight />;
    } else if (todoStatus === 'Done'){
      return <FaArrowLeft />;
    }
  }
    
  render() {
    return (
      <div className="todo-list">
        <TodoForm 
          placeholder={this.props.list}
          todoStatus={this.props.list}
          addTodoHandler={this.props.addTodoHandler}
        />
        {this.props.todos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            todoStatus={this.props.list}
            getArrowButton={this.getArrowButton(this.props.list)}
            changeTodoPlace={this.props.changeTodoPlace}
            removeTodo={this.props.removeTodo}
            modifyTodo={this.props.modifyTodo}/>
        ))} 
      </div>
    );
  }
}

