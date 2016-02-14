// Page showing a list of post summaries
PostListPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    var data = { posts: [] };
    var handle = Meteor.subscribe("posts");
    if (handle.ready()) {
      data.posts = Posts.find({});
    }
    return data;
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
          <table className="post-summary-list" border="0">
            <tbody>
              <tr className="post-summary-header">
                <th className="topic">Topic</th>
                <th className="from">From</th>
                <th className="to">To</th>
                <th className="replies">Replies</th>
                <th className="views">Views</th>
                <th className="activity">Activity</th>
              </tr>
              {this.data.posts.map( (post, index) => {
                return (<tr className="post-summary-data" key={post._id}>
                  <td className="topic">{post.title}</td>
                  <td className="from">{post.authorName}</td>
                  <td className="to">(t)</td>
                  <td className="replies">{post.commentCount}</td>
                  <td className="views">{post.viewCount}</td>
                  <td className="activity">(act)</td>
                </tr>)
              })}
            </tbody>
          </table>
          <Post />
        </div>
      </paper-header-panel>
    );
  }
});
