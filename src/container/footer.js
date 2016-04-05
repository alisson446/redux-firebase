import React from 'react';
import { connect } from 'react-redux';
import {
  syncTodos,
  removeAllTodos
} from '../redux';

const footerComponent = ({ dispatch }) => {
  return (
    <button 
      onClick={() => {
        dispatch(removeAllTodos());
        dispatch(syncTodos());
      }}
    >
      Remove All Todos
    </button>
  );
};

const Footer = connect()(footerComponent);
export default Footer;