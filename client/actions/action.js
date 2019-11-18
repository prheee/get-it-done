import * as types from '../constants/actionTypes.js';

export const inputTodo = data => ({
  type: types.INPUT_TODO,
  payload: data,
});

export const inputDate = date => ({
  type: types.INPUT_DATE,
  payload: date,
});

// add a todo list - sync action - send a post request to the server, and server gives back an id
export const addTodo = (todo) => {
  return dispatch => {
    fetch('/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
          })
      .then(response => response.json())
      .then(data => {
        dispatch( {
          type: types.ADD_TODO, payload: data
        })
      })
      .catch(err => console.error(err));
  }
}

// fetch request onload of the application to store all todo items in the db
export const getTodo = () => {

  return (dispatch) => {
    fetch('/todo', {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        dispatch( {
          type: types.GET_TODO, payload: data
        })
      })
      .catch(err => console.error(err));
  }
}

// delete fetch request to delete a todo item
export const deleteTodo = (id) => {
  return dispatch => {
    fetch('/todo', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id}),
          })
      .catch(err => console.error(err));
    // no need to wait for the promise to resolve, directly update store with id
    dispatch( {
      type: types.DELETE_TODO, payload: id
    })
  }
}

export const sortTodo = () => ({
  type: types.SORT_TODO,
});

export const unsortTodo = () => ({
  type: types.UNSORT_TODO,
});

export const editTodo = (id) => ({
  type: types.EDIT_TODO,
  payload: id
})

export const editText = (text) => ({
  type: types.EDIT_TEXT,
  payload: text
})

export const cancelEdit = () => ({
  type: types.CANCEL_EDIT
})

export const editDate = (date) => ({
  type: types.EDIT_DATE,
  payload: date
})


// fetch request to edit a todo record in the db
export const editSubmit = (data) => {
  return dispatch => {
    fetch('/todo', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
      .catch(err => console.error(err));
    // no need to wait for the promise to resolve, directly update store with id
    dispatch( {
      type: types.EDIT_SUBMIT
    })
  }
}

export const checkTodo = (data) => {
  return dispatch => {
    fetch('/mark', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .catch(err => console.error(err));

    dispatch({ 
      type: types.CHECK_TODO,
      payload: data
    })
  }
}
