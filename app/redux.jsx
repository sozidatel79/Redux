var redux = require('redux');
var axios = require('axios');
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

/*Map reducer and action generators*/
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
    switch (action.type){
        case  'START_LOCATION_FETCH':
            return {
              isFetching:true,
              url: undefined
            };
        case  'COMPLETE_LOCATION_FETCH':
            return {
                isFetching: false,
                url: action.url
            };
        default:
            return state;
    }
};
var ActionStartLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
};
var ActionCompleteLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
};

 var fetchLocation = () => {
  store.dispatch(ActionStartLocationFetch());
  axios.get('http://ipinfo.io').then(function (location) {
        console.log('Here');
        var loc = location.data.loc;
        var baseUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDw-tfjCEGG1Qu7BkGEA-vaophf3P35Swk&q=';
        store.dispatch(ActionCompleteLocationFetch(baseUrl + loc));
  }, function (error) {
        console.log('Error: ', error);
  });
};

var reducers = redux.combineReducers({
   name: nameReducer,
   hobbies: hobbiesReducer,
   movies:  moviesReducer,
   map: mapReducer
});

var store = redux.createStore(reducers, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

var dispatchId = 0;
store.subscribe(() => {
    dispatchId++;
    var state = store.getState();
    if(state.map.isFetching){
        document.getElementById('app').innerHTML = 'Loading...'
    }else if(state.map.url){
        document.getElementById('app').innerHTML = `
        <iframe width="1000" height="500" src="${state.map.url}"></iframe>`;
    }
    console.log('dispatch # ' + dispatchId, state);
});

//fetchLocation();
store.dispatch(ActionChangeName('Anton'));
store.dispatch(ActionAddHobby('Sleep'));
store.dispatch(ActionAddMovie('Demolition man', 'Action'));