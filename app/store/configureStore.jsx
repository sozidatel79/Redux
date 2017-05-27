var redux = require('redux');
var reduxThunk = require('redux-thunk').default;
var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('../reducers/index');

export var config = () => {

    var reducers = redux.combineReducers({
        name: nameReducer,
        hobbies: hobbiesReducer,
        movies:  moviesReducer,
        map: mapReducer
    });

    var store = redux.createStore(reducers, redux.compose(
        redux.applyMiddleware(reduxThunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};