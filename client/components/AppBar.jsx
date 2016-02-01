// Application header bar
AppBar = React.createClass({
  render() {
    return (
      <paper-toolbar>
        <paper-icon-button icon="menu"></paper-icon-button>
        <div className="flex"><span className="title">MedBook</span> | Dogfooders Forum</div>
        <div>
          <paper-icon-button id="notifications" icon="social:notifications" alt="notifications"></paper-icon-button>
          <paper-badge for="notifications" label="3"></paper-badge>
        </div>
        <paper-icon-button icon="more-vert">+</paper-icon-button>
      </paper-toolbar>
    );
  }
});
