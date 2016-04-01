import { 
  fbSyncTodos,
  fbUnsyncTodos,
  fbFetchTodos,
  fbAddTodo,
  fbUpdateTodo,
  fbRemoveTodo,
  fbRemoveAllTodos
} from './firebase';
import { Map, OrderedMap } from 'immutable';

const SYNC = 'SYNC';
const UNSYNC = 'UNSYNC';
const ADD = 'ADD';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';
const REMOVE_ALL = 'REMOVE_ALL';

const ADD_TODO_START = 'ADD_TODO_START';
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
const ADD_TODO_FAIL = 'ADD_TODO_FAIL';
const UPDATE_TODO_START = 'UPDATE_TODO_START';
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
const UPDATE_TODO_FAIL = 'UPDATE_TODO_FAIL';
const REMOVE_TODO_START = 'REMOVE_TODO_START';
const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS';
const REMOVE_TODO_FAIL = 'REMOVE_TODO_FAIL';
const REMOVE_ALL_TODOS_START = 'REMOVE_ALL_TODOS_START';
const REMOVE_ALL_TODOS_SUCCESS = 'REMOVE_ALL_TODOS_SUCCESS';
const REMOVE_ALL_TODOS_FAIL = 'REMOVE_ALL_TODOS_FAIL';

const initialState = Map({
  isSyncing: false,
  items: Map()
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SYNC: 
      return state.setIn(['isSyncing'], true);

    case UNSYNC: 
      return state.setIn(['isSyncing'], false);

    case UPDATE:

    case ADD:
      return state.setIn(['items', action.payload.id], action.payload.todo);

    case REMOVE:
      return state.removeIn(['items', action.payload.id]);

    case REMOVE_ALL:
      return state.update('items', (items) => items.clear());

    default:
      return state;
  }
}

const localSync = () => {
  return { type: SYNC } 
}
const localUnsync = () => {
  return { type: UNSYNC } 
}
const localAddTodo = (id, todo) => {
  return { type: ADD, payload: { id, todo } };
}
const localUpdateTodo = (id, todo) => {
  return { type: UPDATE, payload: { id, todo } };
}
const localRemoveTodo = (id) => {
  return { type: REMOVE, payload: { id } };
}
const localRemoveAllTodos = () => {
  return { type: REMOVE_ALL, payload: {} };
}

const addTodoStart = (todo) => {
  return { type: ADD_TODO_START, meta: { todo } } 
}
const addTodoSuccess = () => {
  return { type: ADD_TODO_SUCCESS, meta: {  } } 
}
const addTodoFail = (error) => {
  return { type: ADD_TODO_FAIL, meta: { error } } 
}
const updateTodoStart = (id, todo) => {
  return { type: UPDATE_TODO_START, meta: { id, todo } } 
}
const updateTodoSuccess = () => {
  return { type: UPDATE_TODO_SUCCESS, meta: {  } } 
}
const updateTodoFail = (error) => {
  return { type: UPDATE_TODO_FAIL, meta: { error } } 
}
const removeTodoStart = (id) => {
  return { type: REMOVE_TODO_START, meta: { id } } 
}
const removeTodoSuccess = () => {
  return { type: REMOVE_TODO_SUCCESS, meta: {  } } 
}
const removeTodoFail = (error) => {
  return { type: REMOVE_TODO_FAIL, meta: { error } } 
}
const removeAllTodosStart = () => {
  return { type: REMOVE_ALL_TODOS_START, meta: { } } 
}
const removeAllTodosSuccess = () => {
  return { type: REMOVE_ALL_TODOS_SUCCESS, meta: {  } } 
}
const removeAllTodosFail = (error) => {
  return { type: REMOVE_ALL_TODOS_FAIL, meta: { error } } 
}

export const syncTodos = () => {
  return (dispatch, getState) => {
    dispatch(localSync());
    fbSyncTodos(
      (snapshot) => dispatch(localAddTodo(snapshot.key(), snapshot.val())),
      (snapshot) => dispatch(localUpdateTodo(snapshot.key(), snapshot.val())),
      (snapshot) => dispatch(localRemoveTodo(snapshot.key()))
    );
  }
}

export const unsyncTodos = () => {
  return (dispatch) => {
    dispatch(localUnsync());
    fbUnsyncTodos(
      (snapshot) => dispatch(localAddTodo(snapshot.key(), snapshot.val())),
      (snapshot) => dispatch(localUpdateTodo(snapshot.key(), snapshot.val())),
      (snapshot) => dispatch(localRemoveTodo(snapshot.key()))
    );
  }
}

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(addTodoStart());
    fbFetchTodos()
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          dispatch(localAddTodo(childSnapshot.key(), childSnapshot.val()));
        });
        dispatch(addTodoSuccess());
      })
      .catch((error) => dispatch(addTodoFail(error)));
  };
}

export const addTodo = (todo) => {
  return (dispatch) => {
    dispatch(addTodoStart());
    fbAddTodo(todo)
      .then(() => dispatch(addTodoSuccess()))
      .catch((error) => dispatch(addTodoFail(error)));
  };
}

export const updateTodo = (id, todo) => {
  return (dispatch) => {
    dispatch(updateTodoStart(id, todo));
    fbUpdateTodo(id, todo)
      .then(() => dispatch(updateTodoSuccess()))
      .catch((error) => dispatch(updateTodoFail(error)));
  };
}

export const removeTodo = (id) => {
  return (dispatch) => {
    dispatch(removeTodoStart(id));
    fbRemoveTodo(id)
      .then(() => dispatch(removeTodoSuccess()))
      .catch((error) => dispatch(removeTodoFail(error)));
  };
}

export const removeAllTodos = () => {
  return (dispatch) => {
    dispatch(removeAllTodosStart());
    fbRemoveAllTodos()
      .then(() => dispatch(removeAllTodosSuccess()))
      .catch((error) => dispatch(removeAllTodosFail(error)));
  }
}

// test outputs
export let _private = {};
if (process.env.NODE_ENV !== 'production') {
  _private = {
    localSync,
    localUnsync,
    localAddTodo,
    localUpdateTodo,
    localRemoveTodo,
    localRemoveAllTodos
  };
}
