import React from 'react';
import { connect } from 'react-redux';
import Todo from '../components/todo';

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo
          name={todo} />
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
  return { dispatch };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
