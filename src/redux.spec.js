// import mocha from 'mocha';
// import { expect } from 'chai';
// import rootReducer from './redux';
// import { Map } from 'immutable';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';

// const logger = createLogger({
//   collapsed: true,
//   stateTransformer: (state) => state.toJS()
// });

// const ADD = 'ADD';
// const UPDATE = 'UPDATE';
// const REMOVE = 'REMOVE';
// const REMOVE_ALL = 'REMOVE_ALL';

// const localAddTodo = (id, todo) => {
//   return { type: ADD, payload: { id, todo } };
// }
// const localUpdateTodo = (id, todo) => {
//   return { type: UPDATE, payload: { id, todo } };
// }
// const localRemoveTodo = (id) => {
//   return { type: REMOVE, payload: { id } };
// }
// const localRemoveAllTodos = () => {
//   return { type: REMOVE_ALL, payload: {} };
// }

// const store = createStore(rootReducer, applyMiddleware(thunk, logger));

// describe('redux methods', function () {

//   describe('add todo to redux', function () {
//     it('should return object todo to save', () => {
//       this.timeout(10000);

//       store.dispatch(localAddTodo('a', 'testeRedux'));
//       expect(store.getState().get('items')).to.equal(Map({'a': 'testeRedux'}));
//     });
//   });

// });