import React from 'react';

// Generic polymer error dialog
ErrorDialog = React.createClass({
  show(message) {
    const el = ReactDOM.findDOMNode(this);
    el.querySelector(".message").innerText = message;
    el.open();
  },

  render() {
    return (
      <paper-dialog modal>
        <p className="message">Message goes here.</p>
        <div className="buttons">
          <paper-button dialog-confirm autofocus>OK</paper-button>
        </div>
      </paper-dialog>
    );
  }
});
