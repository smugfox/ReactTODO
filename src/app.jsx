var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var rootUrl = 'https://blistering-heat-2046.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header />
      </div>
    </div>
  }
});
var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));

// Line 7: Mixin is a group of methods that sits on one object (ReactFire) that gets copied over to another object, in this case, line 9
// So any methods that are on ReactFire, copy paste them over to our component

// Line 8: This makes a news instance of firebase, which will make a connection and requests to our online DB, and we tell it where to exactly look for its data

// It's going to look for it's data at the application url + /items
// /items is going to be a nested route of where our data is going to be stored

// bindAsObject: method given to us by reactfire, which is the bridge between firebase and react,
