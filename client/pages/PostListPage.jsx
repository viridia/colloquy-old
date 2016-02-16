// Page showing a list of post summaries
PostListPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    var data = { posts: [] };
    var handle = Meteor.subscribe("posts");
    if (handle.ready()) {
      data.posts = Posts.find({}).fetch();
    }
    return data;
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
                return <PostSummary post={post} key={post._id} />;
              })}
            </tbody>
          </table>
        </div>
      </paper-header-panel>
    );
  }
});
