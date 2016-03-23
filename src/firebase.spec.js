import mocha from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { 
  fbSyncTodos,
  fbUnsyncTodos,
  fbFetchTodos,
  fbAddTodo,
  fbUpdateTodo,
  fbRemoveTodo,
  fbRemoveAllTodos
} from './firebase';

describe('spy firebase methods', () => {
  let objectTest;
  let methods;

  beforeEach(() => {
    methods = {
      fbFetchTodos,
      fbAddTodo,
      fbUpdateTodo,
      fbRemoveTodo,
      fbRemoveAllTodos
    };
  });

  afterEach(() => {
    objectTest.restore();
  }); 

  describe('spy fbAddTodo', () => {
    it('should return true if send of the object is correct', () => {
      objectTest = sinon.spy(methods, 'fbAddTodo');
      methods.fbAddTodo('addTest');
      expect(objectTest.calledWith('addTest')).to.equal(true);
    });
  });

  describe('spy fbUpdateTodo', () => {
    it('should return true if send of the object is correct', () => {
      objectTest = sinon.spy(methods, 'fbUpdateTodo');
      methods.fbAddTodo('addTest');
      methods.fbUpdateTodo(1, 'updateTest');
      expect(objectTest.calledWith(1, 'updateTest')).to.equal(true);
    });
  });

});