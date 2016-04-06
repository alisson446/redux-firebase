import React from 'react';
import { connect } from 'react-redux';
import {
  syncTodos,
  removeAllTodos
} from '../redux';

const Footer = ({ dispatch }) => {
  return (
    <button 
      onClick={() => {
        dispatch(removeAllTodos());
        dispatch(syncTodos());
      }}>Remove All Todos</button>
  );
};

export default connect()(Footer);
