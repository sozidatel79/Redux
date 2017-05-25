var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
    hobbies: [],
    movies: [],
};

var nextHobbyId = 1;
var nextMovieId = 1;
var dispatchId = 0;

var reducer = (state = stateDefault, action) => {
    switch (action.type){
        case  'ADD_HOBBY':
            return{
                ...state,
                hobbies: [
                    ...state.hobbies,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ]
            };
        case  'ADD_MOVIE':
            return{
                ...state,
                movies: [
                    ...state.movies,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre
                    }
                ]
            };
        case  'REMOVE_HOBBY':
            return{
                ...state,
                hobbies: state.hobbies.filter((hobby) => hobby.id != action.id)
            };
        case  'REMOVE_MOVIE':
            return{
                ...state,
                movies: state.movies.filter((movie) => movie.id != action.id)
            };
        default:
            return state;
    }
};

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