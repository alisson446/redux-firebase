import React from 'react';

const Todo = ({ id, todo, onTodoRemoveClick }) => {
  let showUpdate;

  return (
    <div>
      <li>
        {todo}
      </li>

      <a href='#'
        onClick={() => {
          showUpdate(true);
        }}
      >
        edição
      </a>

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
