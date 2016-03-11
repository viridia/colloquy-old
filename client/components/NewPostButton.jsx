import React from 'react';
import ReactDOM from 'react-dom';

// Renders either a 'new post' or 'sign in to post' button depending on whether
// the user has logged in.
NewPostButton = React.createClass({
  mixins: [ReactMeteorData],
  // Get the logged in state inside getMeteorData() so that the button is
  // reactive with respect to logged-in state.
  getMeteorData() {
    return { isLoggedIn: !!Meteor.user() };
  },

  componentDidMount() {
    // Set up event listeners.
    ReactDOM.findDOMNode(this).addEventListener("tap", this.handleTap);
  },

  handleTap() {
    if (this.data.isLoggedIn) {
      // TODO: Get rid of evil global here, unfortunately React is being
      // highly uncooperative.
      window.HISTORY.push("/post");
    } else {
      throw Error("Not implementd");
    }
  },

  render() {
    if (this.data.isLoggedIn) {
      return (
          <paper-button compact raised
              class="new-post-button layout horizontal center"
              ref={(el) => this.newPostButton = el}>
            <iron-icon icon="add"></iron-icon>&nbsp;
            New Post
          </paper-button>)
    } else {
      return (
        <paper-button compact raised
            class="sign-in-button"
            ref={(el) => this.signInButton = el}>Sign In</paper-button>
        )
    }
  }
});
