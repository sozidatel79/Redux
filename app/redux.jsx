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
                searchText: action.searchText,
                name: action.name
            };
        default:
            return state;
    }
};

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.subscribe(() => {
    var state = store.getState();
    console.log('State is: ', state);
});

store.dispatch({
    type: 'CHANGE_NAME',
    searchText: 'Feed cat'
});

store.dispatch({
    type: 'CHANGE_NAME',
    searchText: 'Walk dog'
});
