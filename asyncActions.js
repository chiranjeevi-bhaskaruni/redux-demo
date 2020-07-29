const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQ = 'FETCH_USERS_REQ';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersReq = {
    type: FETCH_USERS_REQ
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQ:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        // Make an initial API request
        dispatch(fetchUsersReq);
        axios.get('https://jsonpaceholder.typicode.com/users')
        .then(response => {
            // set users data 
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users));
        })
        .catch(error => {
            // set error msg
            dispatch(fetchUsersFailure(error));
        })
    }
}

const store = createStore(reducer, applyMiddleware(logger,thunkMiddleware));
store.subscribe(() => console.log('Users Data', store.getState()));
store.dispatch(fetchUsers());