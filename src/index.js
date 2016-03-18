// import { App } from './App';

// render(<App />, document.getElementById('root'));

import React from 'react';
import { render } from 'react-dom';
import Firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Map, OrderedMap } from 'immutable';
import _ from 'lodash';

const firebaseRef = new Firebase('https://blazing-fire-8383.firebaseio.com/');

const SHOW = 'SHOW';
const ADD = 'ADD';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';

let idAvailable = 0;
function getUniqueId() {
  return idAvailable++;
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW:
      let obj = Object.assign(state, action.payload.values);
      idAvailable = Object.keys(obj).length;
      console.log(obj);
      return obj;

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

const localShowTodo = (values) => {
  return { type: SHOW, payload: { values } };
}
const localAddTodo = (todo) => {
  return { type: ADD, payload: { todo } };
}
const localUpdateTodo = (id, todo) => {
  return { type: UPDATE, payload: { id, todo } };
}
const localRemoveTodo = (id) => {
  return { type: REMOVE, payload: { id } };
}

const showTodo = () => {
  return (dispatch) => {
    firebaseRef.on('value', (allValues) => {
      if(allValues) { 
        dispatch(localShowTodo(allValues.val()));
      }
    });
  };
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
    let firebaseRefUpdate = firebaseRef.child(id);
    firebaseRefUpdate.update({[id]: todo});
  };
}

const removeTodo = (id) => {
  return (dispatch) => {
    dispatch(localRemoveTodo(id));
    let firebaseRefRemove = firebaseRef.child(id);
    firebaseRefRemove.remove();
  };
}

console.log(Map(store.getState()).equals(Map({})));
store.dispatch(showTodo());
setTimeout(store.dispatch(addTodo('title')), 200);
setTimeout(store.dispatch(addTodo('title2')), 200);
setTimeout(store.dispatch(addTodo('title3')), 200);
console.log(Map(store.getState()).equals(Map({ 0: 'title', 1: 'title2', 2: 'title3'})));
store.dispatch(updateTodo(3, 'title1'));
console.log(Map(store.getState()).equals(Map({ 0: 'title1', 1: 'title2', 2: 'title3'})));
store.dispatch(removeTodo(0));
store.dispatch(removeTodo(1));
store.dispatch(removeTodo(2));
console.log(Map(store.getState()).equals(Map({})));

class Teste extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: null };
  }

  componentWillMount() {
    store.dispatch(showTodo());
    this.setState({todos: store.getState()});
  }

  render() {
    return(
      <div>
        <h3>lista</h3>
        <ul>
          {Object.keys(this.state.todos).map((t) => {
            return(
              <li>{t}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

render(<Teste />, document.getElementById('root'));
