import todoReducer from '../client/redux/todoReducer';


// need to add test for the following...

// export const INPUT_TODO = 'INPUT_TODO';
// export const INPUT_DATE = 'INPUT_DATE';
// export const ADD_TODO = 'ADD_TODO';
// export const GET_TODO = 'GET_TODO';
// export const DELETE_TODO = 'DELETE_TODO';
// export const SORT_TODO = 'SORT_TODO';
// export const UNSORT_TODO = 'UNSORT_TODO';
// export const EDIT_TODO = 'EDIT_TODO';
// export const EDIT_TEXT = 'EDIT_TEXT';
// export const EDIT_SUBMIT = 'EDIT_SUBMIT';
// export const CANCEL_EDIT = 'CANCEL_EDIT';
// export const EDIT_DATE = 'EDIT_DATE';

describe('To do reducer', () => {
  let state;

  beforeEach(() => {

    state = {
      todoItems: [],
      newDate: '',
      newTodo: '',
      editingItem: {}
      }
  })

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(todoReducer(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'RANDOM' };
      expect(todoReducer(state, action)).toBe(state);
    });
  });
})