import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import elasticsearch from 'elasticsearch';
import rootReducer, {
  syncTodos,
  unsyncTodos,
  fetchTodos,
  addTodo,
  updateTodo,
  removeTodo,
  removeAllTodos
} from './redux';

import VisibleTodoList from './container/todoList';
import AddTodo from './container/AddTodo';

const logger = createLogger({
  collapsed: true,
  stateTransformer: (state) => state.toJS()
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

class TodoApp extends Component {
  componentDidMount() {
    store.dispatch(fetchTodos());
  }

  render() {
    return (
      <div>
        <p>Todo List</p>
        <AddTodo addTodoToReducer={addTodo} sync={syncTodos} />
        <VisibleTodoList />
      </div>
    );
  }
};

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
// let client = elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });

// client.create({
//   index: 'testindex2',
//   type: 'testtype2',
//   id: '2',
//   body: {
//     title: 'b',
//     number: '2'
//   }
// });

// client.search({
//   index: 'testindex',
//   body: {
//     query: {
//       match_all: {}
//     }
//   }
// }, (error, response) => {
//   console.log(response);
// });

// client.search({
//   index: 'testindex',
//   q: 'title: hello'
// }, (error, response) => {
//   console.trace(response);
// });

// client.count({
//   index: 'testindex'
// }, (error, response) => {
//   console.trace(response.count);
// });

// client.update({
//   index: 'testindex',
//   type: 'testtype',
//   id: '1',
//   body: {
//     doc: {
//       title: 'hello update!'
//     }
//   }
// }, (error, response) => {
//   console.log(response);
// });

// client.delete({
//   index: 'testindex',
//   type: 'testtype',
//   id: '5'
// }, (error, response) => {
//   console.trace(response);
// });

// store.dispatch(removeAllTodos());
// store.dispatch(addTodo('A'));
// store.dispatch(addTodo('B'));
// store.dispatch(addTodo('C'));
// store.dispatch(fetchTodos());
// store.dispatch(updateTodo('-KDUpnb2KyLIHP5FOj1r', 'D'));
// store.dispatch(removeTodo('-KDUsmDwnDqcPMgrNrbE'));
// store.dispatch(removeAllTodos());
// store.dispatch(syncTodos());
// store.dispatch(unsyncTodos());
// setTimeout(store.dispatch(addTodo('title3')), 200);
// console.log(Map(store.getState()).equals(Map({ 1: 'title', 2: 'title2', 3: 'title3'})));
// store.dispatch(updateTodo(1, 'title1'));
// console.log(Map(store.getState()).equals(Map({ 1: 'title1', 2: 'title2', 3: 'title3'})));
// store.dispatch(removeTodo(1));
// store.dispatch(removeTodo(2));
// store.dispatch(removeTodo(3));
// console.log(Map(store.getState()).equals(Map({})));
