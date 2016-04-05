import React from 'react';
import { connect } from 'react-redux';
import Todo from '../components/todo';

import {
  syncTodos,
  removeTodo
} from '../redux';

const TodoList = ({ todos, onTodoRemoveClick }) => {
  return (
    <ul>
      {todos.map((todo, id) =>
        <Todo
          id={id}
          todo={todo}
          onTodoRemoveClick={onTodoRemoveClick} />
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
    onTodoRemoveClick: (key) => {
      dispatch(removeTodo(key));
      dispatch(syncTodos());
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
