var redux = require('redux');

console.log('Starting redux example');

var nextHobbyId = 1;
var nextMovieId = 1;
var dispatchId = 0;

var nameReducer = (state = 'Default', action) => {
    switch (action.type){
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
};

var hobbiesReducer = (state = [], action) => {
    switch(action.type){
        case  'ADD_HOBBY':
            return[
                ...state,
                {
                    id: nextHobbyId++,
                    hobby: action.hobby
                }
            ];
        case  'REMOVE_HOBBY':
            return state.filter((hobby) => hobby.id != action.id);
        default:
            return state;
    }
};

var moviesReducer = (state = [], action) => {
    switch (action.type){
        case  'ADD_MOVIE':
            return [
                ...state,
                {
                    id: nextMovieId++,
                    title: action.title,
                    genre: action.genre
                }
            ];
        case  'REMOVE_MOVIE':
            return state.filter((movie) => movie.id != action.id);
        default:
            return state;
    }
};

var reducer = redux.combineReducers({
   name:    nameReducer,
   hobbies: hobbiesReducer,
   movies:  moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.subscribe(() => {
    dispatchId++;
    var state = store.getState();
    console.log('dispatch # ' + dispatchId, state);
});


store.dispatch({
   type: 'ADD_HOBBY' ,
   hobby: 'Running'
});

store.dispatch({
    type: 'ADD_HOBBY' ,
    hobby: 'Sleep'
});

store.dispatch({
    type: 'ADD_MOVIE' ,
    title: 'Demolition man',
    genre: 'Action',
});

store.dispatch({
    type: 'ADD_MOVIE' ,
    title: 'Bones',
    genre: 'Serials',
});

store.dispatch({
    type: 'REMOVE_HOBBY' ,
    id: 2
});

store.dispatch({
    type: 'REMOVE_MOVIE' ,
    id: 2
});