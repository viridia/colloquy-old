// Component that displays a single avatar image.
Avatar = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    var data = {};
    if (this.props.userId) {
      // It's an avatar for a user.
      var handle = Meteor.subscribe("users");
      if (handle.ready()) {
        const user = Meteor.users.findOne({ _id: this.props.userId });
        if (user && user.profile) {
          data.avatarUrl = user.profile.avatarUrl;
          data.title = user.profile.name;
        }
      }
    } else if (this.props.channelId) {
      // It's an avatar for a channel.
      var handle = Meteor.subscribe("channels");
      if (handle.ready()) {
        const channel = Channels.findOne({ _id: this.props.channelId });
        if (channel) {
          //data.avatarUrl = user.profile.avatarUrl;
          data.title = channel.name;
        }
      }
    }
    return data;
  },

  render() {
    if (this.data.avatarUrl) {
      return (<img className={"avatar " + this.props.className}
          src={this.data.avatarUrl}
          title={this.data.title}></img>);
    } else {
      return (<div
          className={"avatar-placeholder " + this.props.className}
          title={this.data.title}></div>);
    }
  }
});
