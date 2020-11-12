import React, { Component } from 'react';
import Todo from './components/Todo';
import Modal from './components/Modal'

const { ipcRenderer } = window.require('electron');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      modalActive: false
    };
  }
  clickBtn = () => {
    console.log('click');
    this.setState({
      modalActive: true
    })
  };

  componentDidMount() {
    ipcRenderer.send('get:todos');
    ipcRenderer.on('get:todos', (e, todos) => {
      console.log(todos);
      this.setState({
        todos: todos.todos,
      });
    });
  }
  componentWillUpdate() {
    ipcRenderer.on('add:newTodos', (e, todos) => {
      console.log(todos);
      this.setState({
        todos: todos.todos,
      });
    });
  }
  

  changeTodoState = (todo) => {
    console.log(todo);
    ipcRenderer.send('CHANGE_TODO_STATE', todo);
  };

  render() {
    return (
      <div style={appStyles} className="App">
        <div className="container">
          <h1>ToDos</h1>
        <Modal />
          {this.state.todos.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </div>
      </div>
    );
  }
}


const appStyles = {
  margin: '100px 0px'
}


