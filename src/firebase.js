import Firebase from 'firebase';
import { Promise } from 'es6-promise';

const firebaseRef = new Firebase('https://blazing-fire-8383.firebaseio.com/');

let syncListeners = {
  isSyncing: false,
  addListener: false,
  changeListener: false,
  removeListener: false
}

export function fbSyncTodos(addListener, changeListener, removeListener) {
  if (!syncListeners.isSyncing) {
    syncListeners.isSyncing = true;
    syncListeners.addListener = firebaseRef.child('todos').on('child_added', addListener);
    syncListeners.changeListener = firebaseRef.child('todos').on('child_changed', changeListener);
    syncListeners.removeListener = firebaseRef.child('todos').on('child_removed', removeListener);
  }
}

export function fbUnsyncTodos(addListener, changeListener, removeListener) {
  if (syncListeners.isSyncing) {
    syncListeners.isSyncing = false;
    firebaseRef.child('todos').off('child_added', addListener);
    firebaseRef.child('todos').off('child_changed', changeListener);
    firebaseRef.child('todos').off('child_removed', removeListener);
  }
}

export function fbFetchTodos() {
  return new Promise((resolve, reject) => {
    firebaseRef.child('todos').once('value', (snapshot) => {
      resolve(snapshot);
    }, (error) => {
      reject(error.toString());
    });
  });
}

export function fbAddTodo(todo) {
  return new Promise((resolve, reject) => {
    const todoId = firebaseRef.child('todos').push().key();
    firebaseRef.child('todos').child(todoId).set(todo, (error) => {
      if (!error) { resolve(); }
      else { reject(error.toString()); }
    });
  });
}

export function fbUpdateTodo(id, todo) {
  return new Promise((resolve, reject) => {
    firebaseRef.child('todos').child(id).set(todo, (error) => {
      if(!error) { resolve(); }
      else { reject(error.toString()); }
    });
  });
}

export function fbRemoveTodo(id) {
  return new Promise((resolve, reject) => {
    firebaseRef.child('todos').child(id).remove((error) => {
      if(!error) { resolve(); }
      else { reject(error.toString()); }
    });
  });
}

export function fbRemoveAllTodos() {
  return new Promise((resolve, reject) => {
    firebaseRef.child('todos').remove((error) => {
      if(!error) { resolve(); }
      else { reject(error.toString()); }
    });
  });
}
