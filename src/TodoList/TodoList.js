import React, { Component } from 'react';
import './TodoAll.css';
import { TodoForm } from './TodoForm/TodoForm.js'
import { TodoItem } from './TodoItem/TodoItem.js'

export class TodoList extends Component {

  progressArrow = (index, lastIndex) => {
    return (index !== lastIndex) ? true : false; 
  } 

  regressArrow = (index) => {
    return (index !== 0) ? true : false;
  } 

  render() {
    return (
      <div className="todo-list">
        <TodoForm 
          placeholder={this.props.list}
          todoStatus={this.props.list}
          addTodoHandler={this.props.addTodoHandler}/>
        {this.props.todos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            progressArrow={this.progressArrow(this.props.index, this.props.lastIndex)}
            regressArrow={this.regressArrow(this.props.index)}
            progressMove={() => this.props.progressMove(todo.id, todo.text, this.props.index)}
            regressMove={() => this.props.regressMove(todo.id, todo.text, this.props.index)}
            removeTodo={() => this.props.removeTodo(todo.id)}
            modifyTodo={this.props.modifyTodo}/>
        ))} 
      </div>
    );
  }
}

