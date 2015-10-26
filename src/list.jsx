var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <ul>
      {this.renderList()}
    </ul>
  },
  renderList: function() {
    if(this.props.items && Object.keys(this.props.items).length === 0) {
      return <h4>
        Add a todo to get started.
      </h4>
    } else {
      var children = [];

      for(var key in this.props.items) {
        children.push(
          <li>
             {this.props.items[key].text}
          </li>
        )
      }

      return children;
    }
  }
});


// Explanation of What's going on
// We have an object, this.props.items
// Each key represents a single todo
// So We're going to loop through all the keys
// And then for each key, we're going to access the object that it represents
// And we're going to access the text property
// This will be put inside an <li>
// Which in turn is put inside the children array
// And the children array will get rendered inside of our <ul>
