var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://blistering-heat-2046.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
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
        disabled={this.state.done}
        className="form-control"
        value={this.state.text}
        onChange={this.handleTextChange}
      />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
        className="btn btn-default"
        onClick={this.handleDeleteClick}
        >
          Delete
        </button>
      </span>
    </div>
  },
  changesButtons: function() {
    // If the text hasn't changed return null, meaning please don't render this
    if(!this.state.textChanged) {
      return null
    } else {
      return [
        <button
          onClick={this.handleSaveClick}
          className="btn btn-default"
          >
          Save
        </button>,
        <button
          onClick={this.handleUndoClick}
          className="btn btn-default"
          >
          Undo
        </button>
      ]
    }
  },
  handleSaveClick: function() {
    this.fb.update({
      text: this.state.text
    });
    this.setState({
      textChanged: false
    });
  },
  handleUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked};
    this.setState(update);

    // This will update any data sitting at this firebase node
    this.fb.update(update);
  },
  handleDeleteClick: function() {
    this.fb.remove();
  }
});

// Whenever we have a callback on a form element, or really any element, it will always be called with an event object
// event.target selects the input
// event.target.checked to see if the element is checked
