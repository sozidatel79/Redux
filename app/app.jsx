var React = require('react');
var ReactDOM = require('react-dom');
var {hashHistory, Route, Router, IndexRoute} = require('react-router');

// Load Foundation
require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

//App Styles
require('style!css!sass!ApplicationStyles');

ReactDOM.render(
    <h1>Redux</h1>,
    document.querySelector('#app')
);
