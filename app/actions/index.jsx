var axios = require('axios');

export var ActionChangeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
};

export var ActionRemoveHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
};
export var ActionAddMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE' ,
        title,
        genre
    }
}

export var ActionAddHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
};
export var ActionRemoveMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
}

export var ActionStartLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
};
export var ActionCompleteLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
};
export var fetchLocation = () => {

    return (dispatch, getState) => {
        dispatch(ActionStartLocationFetch());
        axios.get('http://ipinfo.io').then(function (location) {
            var loc = location.data.loc;
            var baseUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDw-tfjCEGG1Qu7BkGEA-vaophf3P35Swk&q=';
            dispatch(ActionCompleteLocationFetch(baseUrl + loc));
        }, function (error) {
            console.log('Error: ', error);
        });
    }
};