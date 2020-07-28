const redux = require('redux');
const createStore = redux.createStore

console.log('Redux Demo');

const ADD_DATA = 'ADD_DATA';

const AddAction = {
    type: ADD_DATA,
    desc: 'Adding data'
}

const initialState = {
    numOfRecords: 9
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_DATA': 
            return {
                ...state,
                numOfRecords: state.numOfRecords + 1
            }
        default: 
            return state
    }
}

const store = createStore(reducer);
console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log('State Changes', store.getState()));
store.dispatch(AddAction);
store.dispatch(AddAction);
store.dispatch(AddAction);
unsubscribe();
store.dispatch(AddAction);

