import * as types from '../constants/actionTypes.js'

// initial state structure
const initialState = {
todoItems: [],
newDate: '',
newTodo: '',
editingItem: {}
}

const todoReducer = (state = initialState, action) => {

  let todoItems;
  let editingItem;
  
  switch (action.type) {
    // get current todo list from db
    case types.GET_TODO:
      return {
        ...state,
        todoItems: action.payload
      }
    
    // updating date on change
    case types.INPUT_DATE:
      return {
        ...state,
        newDate: action.payload
      }
    
    // updating todo input on change
    case types.INPUT_TODO:
      return {
        ...state,
        newTodo: action.payload
      }

    // reducer to add todo item into state
    case types.ADD_TODO:
      todoItems = [...state.todoItems];
      todoItems = todoItems.concat(action.payload);

      return {
        ...state,
        todoItems,
        newDate: '',
        newTodo: '',
      }
    
    // reducer function to delete a todo
    case types.DELETE_TODO:
      // based on the action.payload(id), filter out the todo item that has been requested to be deleted
      todoItems = [...state.todoItems].filter((item) => item.id !== action.payload)

      return {
        ...state,
        todoItems
      }
    
    // reducer function to sort todo list by due date
    case types.SORT_TODO:
      // make a shallow copy of the current todo list item, sort it by due date
      todoItems = [...state.todoItems].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      })

      return {
        ...state,
        todoItems
      }

      case types.UNSORT_TODO:
      // make a shallow copy of the current todo list item, sort it by due date
      todoItems = [...state.todoItems].sort((a, b) => {
        return a.id - b.id;
      })

      return {
        ...state,
        todoItems
      }
    
    // initiating an edit todo
    case types.EDIT_TODO:
      // inside of an empty editing item object start adding an id

      // find the record and put it in the todolist array
      // add it to the editing item
      todoItems = [...state.todoItems];

      for (let task of todoItems) {
        if(task.id === action.payload) {
          editingItem = { ...task }
          // break out of the loop as you already found the one editing
          break;
        }
      }
      return {
        ...state,
        editingItem
      }
    
    // reducer function to handle editing the text
    case types.EDIT_TEXT:
      editingItem = {...state.editingItem}
      editingItem.task = action.payload
      return {
        ...state,
        editingItem
      }

    case types.EDIT_DATE:

      editingItem = {...state.editingItem}
      editingItem.date = action.payload

      return {
        ...state,
        editingItem
      }
    
    // edit is confirmed, reducer function to update the main todo item array
    case types.EDIT_SUBMIT:
      editingItem = {...state.editingItem}

      // find the original item and replace it with the edited item
      todoItems = [...state.todoItems]
      todoItems.forEach(item => {
        if (item.id === editingItem.id) {
          item.task = editingItem.task ? editingItem.task : item.task;
          item.date = editingItem.date ? new Date(editingItem.date) : item.date;
        }
      })

      editingItem = {};

      return {
        ...state,
        todoItems,
        editingItem
      }

    case types.CANCEL_EDIT:
      
      editingItem = {};

      return {
        ...state,
        editingItem
      }

    case types.CHECK_TODO:
    
      todoItems = [...state.todoItems];

      for (let task of todoItems) {
        if(task.id === action.payload.id) {
          // toggle through to do item checked marks
          task.completion = task.completion ? false : true;
          break;
        }
      }

      return {
        ...state,
        todoItems
      }
    
    default:
    return state
  }
}

export default todoReducer;