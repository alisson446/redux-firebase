import React from 'react';
import { connect } from 'react-redux';
import Todo from '../components/todo';

import {
  syncTodos,
  updateTodo,
  removeTodo
} from '../redux';

const TodoList = ({ todos, todoUpdateClick, todoRemoveClick }) => {
  return (
    <ul>
      {todos.map((todo, id) =>
        <Todo
          id={id}
          todo={todo}
          todoUpdateClick={todoUpdateClick}
          todoRemoveClick={todoRemoveClick} />
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
    todoRemoveClick: (id) => {
      dispatch(removeTodo(id));
      dispatch(syncTodos());
    },
    todoUpdateClick: (id, value) => {
      dispatch(updateTodo(id, value));
      dispatch(syncTodos());
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
