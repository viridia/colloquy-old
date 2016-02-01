// Page showing a list of post summaries
PostListPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    return {}
  },

  render() {
    return (
      <paper-header-panel className="flex">
        <AppBar />
        <div className="post-list">
          <Post></Post>
          <paper-card className="block">
            <div className="card-content">
              <h1>Todo List</h1>
              <paper-button raised>Button</paper-button>
            </div>
          </paper-card>
        </div>
      </paper-header-panel>
    );
  }
});
