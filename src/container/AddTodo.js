import React from 'react';
import { connect } from 'react-redux';

const AddTodoContainer = ({ dispatch, addTodoToReducer, sync }) => {
  let input;

  return (
    <div>
      <input ref={node => input = node} />
      <button 
        onClick={() => {
          dispatch(addTodoToReducer(input.value));
          input.value = '';
          dispatch(sync());
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

const AddTodo = connect()(AddTodoContainer);
export default AddTodo;