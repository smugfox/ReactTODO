var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://blistering-heat-2046.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(fb, 'items');
    // On lets us listen to events, and firebase has a value events
    // Value emits value, as soon as it sees data flow in
    fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemStore={this.firebaseRefs.items}/>
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List items={this.state.items}/>
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function() {
    // Yes our data has been loaded, it's now safe to show the data on the page
    this.setState({loaded: true});
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
