import mocha from 'mocha';
import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { _private } from './redux';

describe('redux: todos', function () {
  
  const {
    localSync,
    localUnsync,
    localAddTodo,
    localUpdateTodo,
    localRemoveTodo,
    localRemoveAllTodos
  } = _private;

  let store, dispatch, getState;

  beforeEach(function () {
    store = createStore(rootReducer, applyMiddleware(thunk));
    dispatch = store.dispatch;
    getState = store.getState;
  });

  describe('sync', function () {
    it('should sync todos to store', function () {
      dispatch(localSync());
      expect(getState().get('isSyncing')).to.equal(true);
    });
  });

  describe('unsync', function () {
    it('should unsync todos to store', function () {
      dispatch(localUnsync());
      expect(getState().get('isSyncing')).to.equal(false);
    });
  });

  describe('addTodo', function () {
    it('should add todo to store', function () {
      dispatch(localAddTodo(1, 'todo'));
      expect(getState().get('items').size).to.equal(1);
      expect(getState().get('items').first()).to.equal('todo');
    });
  });

  describe('updateTodo', function () {
    it('should update todo to store', function () {
      dispatch(localAddTodo(1, 'todo'));
      dispatch(localUpdateTodo(1, 'todoUpdate'));
      expect(getState().get('items').size).to.equal(1);
      expect(getState().get('items').first()).to.equal('todoUpdate');
    });
  });

  describe('removeTodo', function () {
    it('should remove todo to store', function () {
      dispatch(localAddTodo(1, 'todo'));
      dispatch(localRemoveTodo(1));
      expect(getState().get('items').size).to.equal(0);
    });
  });

  describe('removeAllTodos', function () {
    it('should remove all todos to store', function () {
      dispatch(localAddTodo(1, 'todo'));
      dispatch(localAddTodo(2, 'todo1'));
      dispatch(localRemoveAllTodos());
      expect(getState().get('items').size).to.equal(0);
    });
  });

});
