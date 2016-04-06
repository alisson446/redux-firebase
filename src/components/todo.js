import React from 'react';

const Todo = ({ id, todo, onUpdateClick, onRemoveClick }) => {
  let input;

  return (
    <li>
      
      <input
        ref={(node) => input = node}
        defaultValue={todo}
        onKeyDown={(e) => {
          if (e.which === 13) onUpdateClick(id, input.value);
        }} />

      <button
        onClick={() => {
          onUpdateClick(id, input.value);
        }}>editar</button>

      <button
        onClick={() => {
         onRemoveClick(id);
        }}>excluir</button>

    </li>
  );
};

export default Todo;
