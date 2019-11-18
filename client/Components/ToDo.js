import React from 'react';
import styled from 'styled-components';

const EditButton = styled.button`
  cursor: pointer;
  background: white;
  font-size: 8px;
  border-radius: 1px;
  color: darkOrange;
  border: 1px solid darkOrange;
  transition: 0.1s all ease-out;

  &:hover {
  background-color: darkOrange;
  color: white;
}
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background: white;
  font-size: 8px;
  font-weight: 700;
  border-radius: 1px;
  color: black;
  border: 1px solid black;
  transition: 0.1s all ease-out;

  &:hover {
  background-color: black;
  color: white;
}
`;

const ToDo = ({ item, deleteTodo, editTodo, checkTodo }) => {
  // props include details of the todo item - item
  let itemStatusForUpdate = item.completion ? false : true
  let markedClasses = item.completion ? 'todo-details complete' : 'todo-details' 
  return (
    <div className='todo-container'>
      <div className='todo-row'>
        <div className='todo-details'> 
          <input type='checkbox' onChange={() => checkTodo({id: item.id, completion: itemStatusForUpdate})} checked={item.completion}/>
        </div>
        <div className={markedClasses}> 
          {new Date(item.date).toISOString().slice(0,10)}
        </div> 
        <div className={markedClasses}>
          {item.task}
        </div>
        <div className='todo-details'>
          <EditButton onClick= {() => {
            editTodo(item.id)
          }}>{`Edit`}</ EditButton>
        </div>
        <div className='todo-details'>
          <DeleteButton onClick={() => {
            deleteTodo(item.id)
          }}>{`X`}</ DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default ToDo;  