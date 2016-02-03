// Controls that appear above the list of post summaries.
PostListControls = React.createClass({
  render() {
    return (
      <div className="post-list-controls layout horizontal center">
        (Category Selector)
        {/* Replace with paper-tabs */}
        <paper-button compact class="topic-filter-button">New (72)</paper-button>
        <paper-button compact class="topic-filter-button">Unread</paper-button>
        <paper-button compact class="topic-filter-button">Top</paper-button>
        <div className="flex"></div>
        <NewPostButton />
      </div>
    );
  }
});
