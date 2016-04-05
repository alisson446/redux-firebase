import React from 'react';

const Todo = ({ id, todo, onTodoRemoveClick }) => {
  return (
    <div>
      <li>
        {todo}
      </li>

      <a href='#'
        onClick={() => {
          onTodoRemoveClick(id);
        }}
      >
        excluir
      </a>
    </div>
  );
};

export default Todo;
