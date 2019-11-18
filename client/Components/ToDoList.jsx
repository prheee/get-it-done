import React, { Component } from 'react';
import ToDo from './ToDo'

import { connect } from 'react-redux';
import * as actions from '../actions/action';
import ToDoEditing from './ToDoEditing';

// enable access to centralize store
const mapStateToProps = store => ({
  todoItems: store.todoItems,
  editingItem: store.editingItem
});

// dispatch - action creater functions to enable crud operations
const mapDispatchToProps = dispatch => ({
  deleteTodo: (id) => dispatch(actions.deleteTodo(id)),
  editTodo: (id) => dispatch(actions.editTodo(id)),
  editText: (text) => dispatch(actions.editText(text)),
  editSubmit: (data) => dispatch(actions.editSubmit(data)),
  sortTodo: () => dispatch(actions.sortTodo()),
  unsortTodo: () => dispatch(actions.unsortTodo()),
  cancelEdit: () => dispatch(actions.cancelEdit()),
  editDate: (date) => dispatch(actions.editDate(date)), 
  checkTodo: (data) => dispatch(actions.checkTodo(data)),
})

class ToDoList extends Component {
  constructor(props) {
    super(props)
  }
  render() { 
    // destructuring functions and variables in the props
    const { todoItems, editingItem, deleteTodo, editText, editSubmit, editTodo, sortTodo, unsortTodo, cancelEdit, editDate, checkTodo } = this.props;
    // if an item is being edited, add a editing component to the array, if not add a regular todo component
    const todoArray = todoItems.map((item, index) => {
      if (item.id === editingItem.id) {
        return <ToDoEditing item={item} key={`edit${index}`} cancelEdit={cancelEdit} editText={editText} editSubmit={editSubmit} editingItem={editingItem} editDate={editDate} checkTodo={checkTodo}/>
      }
      else {
        return <ToDo item={item} key={`item${index}`} deleteTodo={deleteTodo} editTodo={editTodo} checkTodo={checkTodo} />
      }
    })

    // need to clean up the display -- make it into divs
    return ( 
      <div>
        <div className='sort-buttons'>
          <button className='individual-sort' onClick={sortTodo}>Sort by due date</button>
          <button className='individual-sort' onClick={unsortTodo}>Unsort</button>
        </div>
        <div className='todo-header'>
          <div className='header-col'></div>
          <div className='header-col due-date-header'>{`Due Date`}</div>
          <div className='header-col to-do-header'>{`To Do`}</div>
          <div className='header-col'></div>
          <div className='header-col'></div>
        </div>
        <div className='todo-content'>
          {todoArray}
        </div>
      </div>
     );
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)