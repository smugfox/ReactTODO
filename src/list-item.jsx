var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://blistering-heat-2046.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleDoneChange}
        />
      </span>
      <input type="text"
        className="form-control"
        value={this.state.text}
      />
      <span className="input-group-btn">
        <button className="btn btn-default">
          Delete
        </button>
      </span>
    </div>
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked};
    this.setState(update);

    // This will update any data sitting at this firebase node
    this.fb.update(update);
  }
});

// Whenever we have a callback on a form element, or really any element, it will always be called with an event object
// event.target selects the input
// event.target.checked to see if the element is checked
