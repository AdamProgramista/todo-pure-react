import React, { Component } from 'react';
import './App.css';
import { Header } from './Header/Header.js'; 
import { TodoList } from './TodoList/TodoList.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextId: 1,
      lists: [
        {
          description: 'To do',
          todos: []
        },
        {
          description: 'Done',
          todos: []
        }
      ]
    }
  }
  
  addTodoHandler = (todo) => {
    const newTodo = {
      id: this.state.nextId,
      text: todo.todoContent
    }
    
    const status = todo.todoStatus;
    
    this.setState({
      nextId: this.state.nextId + 1,
      lists: this.state.lists.map(list => {
        if(list.description === status) {
          return {
             ...list,
             todos: [ ...list.todos, newTodo ]
          }
        }
        return list;
      })
    });
  }
  
  removeTodo = (id) => {
    this.setState({
      lists: this.state.lists.map(list => {
        return {
          ...list,
          todos: list.todos.filter(todo => todo.id !== id)
        }
      })
    });
  }
  
  changeTodoPlace = (id, text, status) => {
    const todoCopy = {
      id,
      text
    }
    console.log(todoCopy);
    switch (status) {
      case 'To do':
        return this.setState({
          lists: [
            {
              description: this.state.lists[0].description,
              todos: [...this.state.lists[0].todos.filter(todo => todo.id !== id)]
            },
            {
              description: this.state.lists[1].description,
              todos: [ ...this.state.lists[1].todos, todoCopy ]
            }
          ]
        })
      case 'Done':
         return this.setState({
          lists: [
            {
              description: this.state.lists[0].description,
              todos: [ ...this.state.lists[0].todos, todoCopy ]
            },
            {
              description: this.state.lists[1].description,
              todos: [...this.state.lists[1].todos.filter(todo => todo.id !== id)]
            },
          ]
        })
      }
  }
  
  modifyTodo = (id, newText) => {
    console.log(id, newText);
    const modifiedTodo = {
      id,
      text: newText
    }
    this.setState({
      lists: this.state.lists.map(list => {
        const todoIndex = list.todos.findIndex(todo => todo.id === id)
        if (todoIndex>=0){
          return {
            ...list,
            todos: [...list.todos.slice(0,todoIndex), modifiedTodo, ...list.todos.slice(todoIndex+1)]
          }
        } else {
          return list;
        }
      })
    });
  }
  
  render() {
      console.log(this.state);
      return (
      <div className="App">
        <Header text="My TodoApp" />
        {this.state.lists.map(list => (
        <TodoList
          key={list.description}
          list={list.description}
          addTodoHandler={this.addTodoHandler}
          changeTodoPlace={this.changeTodoPlace}
          removeTodo={this.removeTodo}
          modifyTodo={this.modifyTodo}
          todos={list.todos}
          />
        ))}
      </div>
    );
  }
}

export default App;
