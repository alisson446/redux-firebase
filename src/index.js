/*import mocha from 'mocha';
import { expect } from 'chai';*/
import Firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Map, OrderedMap } from 'immutable';
import _ from 'lodash';

const firebaseRef = new Firebase('https://blazing-fire-8383.firebaseio.com/');

const SYNC = 'SYNC';
const UNSYNC = 'UNSYNC';
const ADD = 'ADD';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';
const REMOVE_ALL = 'REMOVE_ALL';

const initialState = Map({
  isSyncing: false,
  items: Map()
});

const reducer = (state = initialState, action) => {
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
      return state.removeIn(['items']);

    default:
      return state;
  }
}

const logger = createLogger({
  collapsed: true,
  stateTransformer: (state) => state.toJS()
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


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
const localRemoveAll = () => {
  return {type: REMOVE_ALL, payload: {} };
}

const callbackSyncAdd = (snapshot) => {
  dispatch(localAddTodo(snapshot.key(), snapshot.val()));
}

const callbackSyncUpdate = (snapshot) => {
  dispatch(localUpdateTodo(snapshot.key(), snapshot.val()));
}

const callbackSyncRemove = (snapshot) => {
  dispatch(localRemoveTodo(snapshot.key(), snapshot.val()));
}

const syncTodos = () => {
  return (dispatch, getState) => {
    if(!getState().get('isSyncing')) {
      dispatch(localSync());
      firebaseRef.child('todos').on('child_added', callbackAdd);

      firebaseRef.child('todos').on('child_changed', callbackUpdate);

      firebaseRef.child('todos').on('child_removed', callbackRemove);
    }
  }
}

const unsyncTodos = () => {
  return (dispatch) => {
    firebaseRef.child('todos').off('child_added', callbackAdd);
    firebaseRef.child('todos').off('child_changed', callbackUpdate);
    firebaseRef.child('todos').off('child_removed', callbackRemove);
    dispatch(localUnsync());
  }
}

const fetchTodos = () => {
  return (dispatch) => {
    firebaseRef.child('todos').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        dispatch(localAddTodo(childSnapshot.key(), childSnapshot.val()));
      });
    });
  };
}

const addTodo = (todo) => {
  return (dispatch) => {
    const todoId = firebaseRef.child('todos').push().key();
    firebaseRef.child('todos').child(todoId).set(todo, (error) => {
      if (!error) { console.log('add success'); }
      else { console.log('error in add'); }
    });
  };
}

const updateTodo = (id, todo) => {
  return (dispatch) => {
    firebaseRef.child('todos').child(id).set(todo, (error) => {
      if(!error) { console.log('update success') }
      else { console.log('error in update') }
    });
  };
}

const removeTodo = (id) => {
  return (dispatch) => {
    firebaseRef.child('todos').child(id).remove();
  };
}

const removeAllTodos = () => {
  return (dispatch) => {
    firebaseRef.child('todos').remove();
  }
}

// TEST
/*mocha.setup('bdd');

describe('redux + firebase', () => {
  describe('add todo to redux', () => {

  });
});

mocha.run();*/

// store.dispatch(removeAllTodos());
// store.dispatch(addTodo('A'));
// store.dispatch(addTodo('B'));
// store.dispatch(addTodo('C'));
// store.dispatch(fetchTodos());
/*store.dispatch(updateTodo('-KDPYlCxb3SfMpLbRPuX', 'D'));
store.dispatch(removeTodo('-KDPYlD4VOne46QAeY1i'));*/
// store.dispatch(removeAllTodos());
 store.dispatch(syncTodos());
 store.dispatch(unsyncTodos());
/*setTimeout(, 200);
setTimeout(store.dispatch(addTodo('title3')), 200);
console.log(Map(store.getState()).equals(Map({ 1: 'title', 2: 'title2', 3: 'title3'})));
store.dispatch(updateTodo(1, 'title1'));
console.log(Map(store.getState()).equals(Map({ 1: 'title1', 2: 'title2', 3: 'title3'})));
store.dispatch(removeTodo(1));
store.dispatch(removeTodo(2));
store.dispatch(removeTodo(3));
console.log(Map(store.getState()).equals(Map({})));*/

/*class Teste extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: {} };
  }

  componentDidMount() {
    store.dispatch(showTodo());
    let lista = store.getState();
    console.log(lista);
    this.setState({todos: lista});
  }

  render() {
    return(
      <div>
        <h3>lista</h3>
        <ul>
          {Object.keys(this.state.todos).map((t) => {
            return(
              <li>{this.state.todos[t]}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

render(<Teste />, document.getElementById('root'));*/
