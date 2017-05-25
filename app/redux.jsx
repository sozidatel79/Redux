var redux = require('redux');

console.log('Starting redux example');

var currentState = {
    showCompleted: false,
    searchText: '',
    name: '',
    todos: []
};

var reducer = (state = currentState, action) => {
    switch (action.type){
        case  'CHANGE_NAME':
            return{
                ...state,
                searchText: action.searchText
            };
        default:
            return state;
    }
};

var store = redux.createStore(reducer);
var currentState = store.getState();


store.dispatch({
    type: 'CHANGE_NAME',
    searchText: 'Anton',
});
console.log('searchText should be Anton', store.getState());