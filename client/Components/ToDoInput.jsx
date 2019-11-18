import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components'
import FormError from './FormError';

import { connect } from 'react-redux';
import * as actions from '../actions/action';

const mapStateToProps = store => ({
  state: store
})

// functions/actions to add to-do item
const mapDispatchToProps = dispatch => ({
  inputDate: (day) => dispatch(actions.inputDate(day)),
  inputTodo: (data) => dispatch(actions.inputTodo(data)),
  addTodo: (data) => dispatch(actions.addTodo(data))
})

// one styled component for the main add button
const Button = styled.button`
  cursor: pointer;
  background: white;
  font-size: 10px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.2s all ease-out;

  &:hover {
  background-color: palevioletred;
  color: white;
}
`;

class ToDoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(), // today's date
      taskInvalid: false,
      dateInvalid: false,
    }
    this.makeFormError = this.makeFormError.bind(this);
    this.inputValidationCheckAndRun = this.inputValidationCheckAndRun.bind(this);
  }

  makeFormError() {
    let displayError = this.state.taskInvalid && this.state.dateInvalid  ? <FormError message={'task and date format'}/> : '';
    displayError = this.state.dateInvalid && !this.state.taskInvalid ? <FormError message={'date format'}/> : displayError;
    displayError = !this.state.dateInvalid && this.state.taskInvalid ? <FormError message={'task format'}/> : displayError;
    return displayError
  }

  inputValidationCheckAndRun() {
    const { state, addTodo } = this.props;
    const { today } = this.state;

    if (state.newTodo && state.newDate && state.newDate > today) {
      addTodo({task: state.newTodo, date: state.newDate, completion: false})
      this.setState( { taskInvalid: false, dateInvalid: false } )
    }
    else if (!state.newTodo && state.newDate && state.newDate > today) {
      this.setState( { taskInvalid: true, dateInvalid: false } )
    }
    else if (state.newTodo && (!state.newDate || (state.newDate <= today))) {
      this.setState( { taskInvalid: false, dateInvalid: true } )
    }
    else this.setState( { taskInvalid: true, dateInvalid: true } )
  }

  render() { 

    // destructuring functions and variables in the props
    const { state, inputTodo, inputDate } = this.props;
    const formErrorMessage = this.makeFormError();

    return ( 
    <div>
      <div className='input-container'>
        <input 
          className='main-input todo-input'
          type='text'
          placeholder='Add a to do item...'
          required={true}
          value={state.newTodo}
          onChange={(e) => {inputTodo(e.target.value)}}
        />
        <DayPickerInput
          className='main-input'
          placeholder='Select a due date'
          onDayChange={(day) => inputDate(day)} 
        />
        <Button onClick={() => this.inputValidationCheckAndRun()}>+</Button>
      </div> 
        <div className='form-error'>
          {formErrorMessage}
        </div>
    </div>
    );
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ToDoInput);