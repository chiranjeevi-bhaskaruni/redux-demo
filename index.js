const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger();

console.log('Redux Demo');

const ADD_DATA = 'ADD_DATA';
const FIRST_DATA = 'FIRST_DATA';
const SECOND_DATA = 'SECOND_DATA';

const AddAction = {
    type: ADD_DATA,
    desc: 'Adding data'
}

const FirstAction = {
    type: FIRST_DATA,
    desc: 'First data'
}

const SecondAction = {
    type: SECOND_DATA,
    desc: 'Second data'
}

const initialState = {
    numOfRecords: 9
}

const firstInitialData = {
    data: 7
}

const secondInitialData = {
    data: 9
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

const firstReducer = (state = firstInitialData, action) => {
    switch(action.type) {
        case FIRST_DATA: 
            return {
                ...state,
                data: state.data + 1
            }
        default: 
            return state
    }
}

const secondReducer = (state = secondInitialData, action) => {
    switch(action.type) {
        case SECOND_DATA: 
            return {
                ...state,
                data: state.data - 1
            }
        default: 
            return state
    }
}

// const store = createStore(reducer);
// console.log(store.getState());
// const unsubscribe = store.subscribe(() => console.log('State Changes', store.getState()));
// store.dispatch(AddAction);
// store.dispatch(AddAction);
// store.dispatch(AddAction);
// unsubscribe();
// store.dispatch(AddAction);

const rootReducer = combineReducers( {firstReducer, secondReducer});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log('State Changes', store.getState()));
store.dispatch(FirstAction);
store.dispatch(SecondAction);
store.dispatch(FirstAction);
store.dispatch(SecondAction);
unsubscribe();

