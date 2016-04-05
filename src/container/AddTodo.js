import React from 'react';
import { connect } from 'react-redux';

import {
  syncTodos,
  addTodo
} from '../redux';

const AddTodoContainer = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => input = node} />
      <button 
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
          dispatch(syncTodos());
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

const AddTodo = connect()(AddTodoContainer);
export default AddTodo;