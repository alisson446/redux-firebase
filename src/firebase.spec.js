import mocha from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  fbAddTodo,
  fbUpdateTodo,
  fbRemoveTodo
} from './firebase';

describe('spy firebase methods', () => {
  let objectTest;
  let methods;

  before(() => {
    methods = {
      fbAddTodo,
      fbUpdateTodo,
      fbRemoveTodo,
    };
  });

  afterEach(() => {
    objectTest.restore();
  });

  describe('spy fbAddTodo', () => {
    it('should return true if the method is sending string to add correctly', () => {
      objectTest = sinon.spy(methods, 'fbAddTodo');
      methods.fbAddTodo('addTest');
      expect(objectTest.calledWith('addTest')).to.equal(true);
    });
  });

  describe('spy fbUpdateTodo', () => {
    it('should return true if the method is sending object to update correctly', () => {
      objectTest = sinon.spy(methods, 'fbUpdateTodo');
      methods.fbUpdateTodo(1, 'updateTest');
      expect(objectTest.calledWith(1, 'updateTest')).to.equal(true);
    });
  });

  describe('spy fbRemoveTodo', () => {
    it('should return true if the method is sending id to remove correctly', () => {
      objectTest = sinon.spy(methods, 'fbRemoveTodo');
      methods.fbRemoveTodo(1, 'removeTest');
      expect(objectTest.calledWith(1, 'removeTest')).to.equal(true);
    });
  });

});
