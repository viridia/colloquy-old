// Component that displays a single avatar image.
Avatar = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    var data = {};
    var handle = Meteor.subscribe("users");
    if (handle.ready()) {
      const user = Meteor.users.findOne({ _id: this.props.userId });
      if (user && user.profile) {
        data.avatarUrl = user.profile.avatarUrl;
      }
    }
    return data;
  },

  render() {
    if (this.data.avatarUrl) {
      return (<img className={"avatar " + this.props.className}
          src={this.data.avatarUrl}></img>);
    } else {
      return (<div
          className={"avatar-placeholder" + this.props.className}></div>);
    }
  }
});
