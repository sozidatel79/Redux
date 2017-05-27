var redux = require('redux');
var actions = require('./actions/index');
var store = require('./store/configureStore').config();

console.log('Starting redux example');

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

store.dispatch(actions.fetchLocation());
store.dispatch(actions.ActionChangeName('Anton'));
store.dispatch(actions.ActionAddHobby('Sleep'));
store.dispatch(actions.ActionAddMovie('Demolition man', 'Action'));