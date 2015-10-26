var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },
  render: function() {
    return <div className="input-group">
      <input
        value={this.state.text}
        onChange={this.handleInputChange}
        type="text"
        className="form-control" />
      <span className="input-group-btn">
        <button
          onClick={this.handleClick}
          className="btn btn-default"
          type="button">
          Add
        </button>
      </span>
    </div>
  },
  handleClick: function() {
    // We make a reference to our firebase object, which we pass down from app.jsx, and we call it itemStore
    // Then we use a method called push, which is a firebase method which creates a new object in our remote database
    this.props.itemStore.push({
      text: this.state.text,
      done: false
    });

    this.setState({ text: '' });
  },
  handleInputChange: function(event) {
    // Hey, whatever event this just happened too, give me a DOM node reference to it.  In this case it's our input
    this.setState({text: event.target.value});
  }
});


// Control Form Element: The value of the input, (the value of whatever text we're entering) is directly tied to this.state


// WHAT ALL OF THIS DOES
// When the component first renders, this.state.text will be an empty string.
// We assign the value of this.state.text to be equal to the value of the input
// That means that the input is only ever going to show the value of this.state.text
// When the user updates the value of the input, type in some text, that triggers our change event
// As the user starts typing some information, we update the value of this.state.text with value of whatever it is that they're typing into the input
// Since the input shows the value of this.state.text, the value of the input will be updated as the user types as well.
// Whenever the user clicks the button
