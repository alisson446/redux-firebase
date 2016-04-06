import React from 'react';
import { connect } from 'react-redux';
import {
  syncTodos,
  addTodo
} from '../redux';

const AddTodo = ({ dispatch }) => {
  let input;

  function _addTodo() {
    dispatch(addTodo(input.value));
    input.value = '';
  }

  return (
    <div>
      <input
        ref={node => input = node}
        onKeyDown={(e) => {
          if (e.which === 13) _addTodo();
        }} />
      <button 
        onClick={_addTodo}>
        Add Todo
      </button>
    </div>
  );
};

export default connect()(AddTodo);
