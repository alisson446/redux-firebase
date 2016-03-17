// import React from 'react';
// import { render } from 'react-dom';
// import { App } from './App';

// render(<App />, document.getElementById('root'));

import Firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Map, OrderedMap } from 'immutable';
import _ from 'lodash';

const firebaseRef = new Firebase('https://blazing-fire-8383.firebaseio.com/');

const ADD = 'ADD';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';

let id = 0;
function getUniqueId() {
 return id++;
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD:
      return Object.assign({}, state, {
        [getUniqueId()]: action.payload.todo
      });

    case UPDATE:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload.todo
      });

    case REMOVE:
      return _.omit(state, [action.payload.id]);
    default:
      return state;
  }
  return state;
}

const store = createStore(reducer, applyMiddleware(thunk));

const localAddTodo = (todo) => {
  return { type: ADD, payload: { todo } };
}
const localUpdateTodo = (id, todo) => {
  return { type: UPDATE, payload: { id, todo } };
}
const localRemoveTodo = (id) => {
  return { type: REMOVE, payload: { id } };
}

const addTodo = (todo) => {
  return (dispatch) => {
    dispatch(localAddTodo(todo));
    firebaseRef.set(store.getState());
  };
}

const updateTodo = (id, todo) => {
  return (dispatch) => {
    dispatch(localUpdateTodo(id, todo));
    firebaseRef.update(store.getState());
  };
}

const removeTodo = (id) => {
  return (dispatch) => {
    dispatch(localRemoveTodo(id));
    firebaseRef.remove(store.getState());
  };
}

console.log(Map(store.getState()).equals(Map({})));
store.dispatch(addTodo('title'));
store.dispatch(addTodo('title2'));
store.dispatch(addTodo('title3'));
console.log(Map(store.getState()).equals(Map({ 0: 'title', 1: 'title2', 2: 'title3'})));
store.dispatch(updateTodo(0, 'title1'));
console.log(Map(store.getState()).equals(Map({ 0: 'title1', 1: 'title2', 2: 'title3'})));
store.dispatch(removeTodo(0));
store.dispatch(removeTodo(1));
store.dispatch(removeTodo(2));
console.log(Map(store.getState()).equals(Map({})));
