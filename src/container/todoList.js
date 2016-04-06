import React from 'react';
import { connect } from 'react-redux';
import Todo from '../components/todo';
import {
  syncTodos,
  updateTodo,
  removeTodo
} from '../redux';

const TodoList = ({ todos, onUpdateClick, onRemoveClick }) => {
  return (
    <ul>
      {todos.entrySeq().map((todoTuple) =>
        <Todo
          key={todoTuple[0]}
          id={todoTuple[0]}
          todo={todoTuple[1]}
          onUpdateClick={onUpdateClick}
          onRemoveClick={onRemoveClick} />
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.get('items')
  };
};

const mapDispatchToProps = (dispatch) => {
  return { 
    onRemoveClick: (id) => {
      dispatch(removeTodo(id));
    },
    onUpdateClick: (id, value) => {
      dispatch(updateTodo(id, value));
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
