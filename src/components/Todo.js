import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.todo.id,
      todo: props.todo.todo,
      done: props.todo.done ? true : false,
    };
  }

  todoHandler = () => {
    this.setState({
      done: this.state.done ? false : true,
    });
  };

  changeTodoState = (todo) => {
    console.log(todo);
    ipcRenderer.send('update:todo', todo);
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col s12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{this.state.todo}</span>
              </div>
              <div className="card-action">{this.state.done ? <a onClick={this.todoHandler}>Undone</a> : <a onClick={this.todoHandler}>Mark as Done</a>}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
