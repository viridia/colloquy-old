// Comment component - represents a commment to a post
Comment = React.createClass({
  render() {
    return (
      <div className="comment layout horizontal">
        <div className="comment-author-avatar"></div>
        <div className="comment-content flex">
          <div className="comment-info layout horizontal">
            <div className="comment-author flex">{this.props.comment.authorName}</div>
            <div className="comment-age">{this.props.comment.age}</div>
          </div>
          <div className="comment-body">{this.props.comment.body}</div>
        </div>
      </div>
    );
  }
});
