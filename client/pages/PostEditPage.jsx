// The Post Edit / Post Create page
PostEditPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    return {}
  },

  render() {
    return (
      <paper-header-panel className="flex">
        <AppBar />
        <PostForm />
      </paper-header-panel>
    );
  }
});
