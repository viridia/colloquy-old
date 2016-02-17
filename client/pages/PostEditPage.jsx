// The Post Edit / Post Create page
PostEditPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    data = {};
    const postId = this.props.params.postId;
    if (postId) {
      var postsHandle = Meteor.subscribe('post', postId);
      var usersHandle = Meteor.subscribe('users');
      if (postsHandle.ready() && usersHandle.ready()) {
        data.post = Posts.findOne({ slug: postId });
        data.recipients = [];
        for (var channelId of data.post.recipientChannels) {
          // TODO: Implement.
        }
        for (var userId of data.post.recipientUsers) {
          const user = Meteor.users.findOne(userId);
          if (user) {
            data.recipients.push({
              text: user.profile.name,
              tag: "user:" + user._id,
              imgUrl: user.profile.avatarUrl,
            });
          }
        }
//        data.recipientUsers = Meteor.users.find();
      }
    }
    return data;
  },

  render() {
    return (
      <paper-header-panel className="flex">
        <AppBar />
        <PostForm post={this.data.post} recipients={this.data.recipients} />
      </paper-header-panel>
    );
  }
});
