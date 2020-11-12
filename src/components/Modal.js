import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      done: false,
    };
  }

  inputOnChange = (e) => {
      this.setState({
          todo: e.target.value
      })
  }

  onSubmitBtn = (e) => {
    e.preventDefault()
    ipcRenderer.send('add:todo', this.state.todo);
}


  render() {
    return (
      <div style={modalStyles}  className="col s12">
        <form>
            <input onChange={this.inputOnChange} type="text" />
            <button onClick={this.onSubmitBtn} className="btn waves-effect waves-light"><i className="material-icons left">Add</i></button>
        </form>
      </div>
    );
  }
}
const modalStyles = {
  margin: '100px 0px'
}