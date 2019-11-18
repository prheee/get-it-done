import React, { Component } from 'react';
import ToDoInput from './ToDoInput';
import ToDoList from './ToDoList';

// main container that renders todo input field and todo list
class MainContainer extends Component {
  render() { 
    return (
      <div className='container'>
        <h2>Get it DONE!</h2>
        <ToDoInput />
        <ToDoList />
      </div>
      );
  }
}
 
export default MainContainer;