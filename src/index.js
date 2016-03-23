import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer, {
  syncTodos,
  unsyncTodos,
  fetchTodos,
  addTodo,
  updateTodo,
  removeTodo,
  removeAllTodos
} from './redux';

const logger = createLogger({
  collapsed: true,
  stateTransformer: (state) => state.toJS()
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

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