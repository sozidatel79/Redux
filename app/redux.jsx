var redux = require('redux');

console.log('Starting redux example');

/*Name reducer and action generators*/
var nameReducer = (state = 'Default', action) => {
    switch (action.type){
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
};
var ActionChangeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
};

/*Hobby reducer and action generators*/
var nextHobbyId = 1;
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
var ActionAddHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
};
var ActionRemoveHobby = (id) => {
  return {
      type: 'REMOVE_HOBBY',
      id
  }
};

/*Movie reducer and action generators*/
var nextMovieId = 1;
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
var ActionAddMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE' ,
        title,
        genre
    }
}
var ActionRemoveMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
}

var reducers = redux.combineReducers({
   name: nameReducer,
   hobbies: hobbiesReducer,
   movies:  moviesReducer
});

var store = redux.createStore(reducers, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

var dispatchId = 0;
store.subscribe(() => {
    dispatchId++;
    var state = store.getState();
    console.log('dispatch # ' + dispatchId, state);
});

store.dispatch(ActionChangeName('Anton'));
store.dispatch(ActionAddHobby('Sleep'));
store.dispatch(ActionAddMovie('Demolition man', 'Action'));