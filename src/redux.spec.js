import mocha from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, {
  syncTodos,
  unsyncTodos,
  fetchTodos,
  addTodo,
  updateTodo,
  removeTodo,
  removeAllTodos
} from './redux';

const storeTest = createStore(rootReducer, applyMiddleware(thunk));

describe('redux methods', () => {

  let objectTest;

  afterEach(() => {
    objectTest.restore();
  });

  // describe('add todo to redux', () => {
  //   it('should return state with object todo saved', () => {
  //
  //   });
  // });
});
