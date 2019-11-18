import React from 'react';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const CancelButton = styled.button`
  cursor: pointer;
  background: white;
  font-size: 8px;
  border-radius: 1px;
  color: red;
  border: 1px solid red;
  transition: 0.1s all ease-out;

  &:hover {
  background-color: red;
  color: white;
}
`;

const ConfirmButton = styled.button`
  cursor: pointer;
  background: white;
  font-size: 8px;
  border-radius: 1px;
  color: #00cc00;
  border: 1px solid #00cc00;
  transition: 0.1s all ease-out;

  &:hover {
  background-color: #00cc00;
  color: white;
}
`;

const ToDoEditing = ({ item, editingItem, editSubmit, cancelEdit, editText, editDate }) => {

  return (
    <div>
      <div className='todo-row'>
        <div className='todo-details'> 
        </div>
        <div className='todo-details'> 
          <DayPickerInput
            placeholder={new Date(item.date).toISOString().slice(0,10)}
            onDayChange={(day) => editDate(day)} 
          />
        </div>
        <div className='todo-details'> 
          <input placeholder={item.task} onChange={(e)=> {
            editText(e.target.value);
          }}/>
        </div>
        <div className='todo-details'> 
          <ConfirmButton onClick= {() => {
            editSubmit({id: editingItem.id, task: editingItem.task, date: editingItem.date})
          }}>{`Confirm`}</ConfirmButton>
        </div>
        <div className='todo-details'> 
          <CancelButton onClick={() => {
            cancelEdit();
          }}>{`Cancel`}</ CancelButton>
        </div>
      </div>
    </div>
  );
}
 
export default ToDoEditing;