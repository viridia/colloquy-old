// Application header bar
AppBar = React.createClass({
  render() {
    return (
      <paper-toolbar>
        <style is="custom-style">{`
          paper-badge {
            --paper-badge-margin-left: -16px;
            --paper-badge-margin-bottom: -16px;
          }
        `}
        </style>
        <paper-icon-button icon="menu"></paper-icon-button>
        {this.props.showBackButton ?
            <paper-icon-button icon="arrow-back"></paper-icon-button> : ''}
        <div className="flex"><span className="title">MedBook</span> | Dogfooders Forum</div>
        <AccountsUIWrapper />
        <div>
          <paper-icon-button id="notifications" icon="social:notifications" alt="notifications"></paper-icon-button>
          <paper-badge for="notifications" label="3"></paper-badge>
        </div>
        <paper-icon-button icon="more-vert">+</paper-icon-button>
      </paper-toolbar>
    );
  }
});
