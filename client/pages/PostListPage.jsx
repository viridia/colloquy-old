// Page showing a list of post summaries
PostListPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    return {}
  },

  handleClick: function() {
    // Explicitly focus the text input using the raw DOM API.
    if (this.autoCompleteInput !== null) {
      console.debug('sutocomplete selected objects: ', this.autoCompleteInput.selectedObjects);
    }
  },

  render() {
    return (
      <paper-header-panel className="flex">
        <AppBar />
        <div className="post-list">
          <PostListControls />
          <Post />
          <paper-card className="block">
            <div className="card-content">
              <h1>Todo List</h1>
              <paper-button raised onClick={this.handleClick}>Button</paper-button>
            </div>
          </paper-card>
        </div>
      </paper-header-panel>
    );
  }
});
