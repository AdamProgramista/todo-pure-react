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
  
  progressMove = (id, text, listIndex) => {
    const todoCopy = {
      id,
      text
    }

    this.setState({
      lists: [
        {
          description: this.state.lists[listIndex].description,
          todos: [...this.state.lists[listIndex].todos.filter(todo => todo.id !== id)]
        },
        {
          description: this.state.lists[listIndex+1].description,
          todos: [ ...this.state.lists[listIndex+1].todos, todoCopy ]
        }
      ]
    })
  }

  regressMove = (id, text, listIndex) => {
    const todoCopy = {
      id,
      text
    }

    this.setState({
      lists: [
        {
          description: this.state.lists[listIndex-1].description,
          todos: [ ...this.state.lists[listIndex-1].todos, todoCopy ]
        },
        {
          description: this.state.lists[listIndex].description,
          todos: [...this.state.lists[listIndex].todos.filter(todo => todo.id !== id)]
        },
      ]
    })
  }
  
  modifyTodo = (id, newText) => {
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
    return (
      <div className="App">
        <Header text="My TodoApp" />
        <div className="App-content">
        {this.state.lists.map((list,index) => (
          <TodoList
            key={index}
            index={index}
            lastIndex={this.state.lists.length-1}
            list={list.description}
            addTodoHandler={this.addTodoHandler}
            progressMove={this.progressMove}
            regressMove={this.regressMove}
            removeTodo={this.removeTodo}
            modifyTodo={this.modifyTodo}
            todos={list.todos}/>
        ))}
        </div>
      </div>
    );
  }
}

export default App;
