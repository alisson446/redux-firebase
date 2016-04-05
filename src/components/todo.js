import React from 'react';

const Todo = ({ id, todo, todoUpdateClick, todoRemoveClick }) => {
  let input;

  return (
    <div>
      <li>
        <input ref={(node) => input = node} defaultValue={todo} />

        <a href='#'
          onClick={() => {
            todoUpdateClick(id, input.value);
          }}
        >
          editar
        </a>
      </li>

      <a href='#'
        onClick={() => {
          todoRemoveClick(id);
        }}
      >
        excluir
      </a>
    </div>
  );
};

export default Todo;
