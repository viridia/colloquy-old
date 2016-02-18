// Comment component - represents a commment to a post
Comment = React.createClass({
  renderBodyHTML() {
    return { __html: this.props.comment.body };
  },

  render() {
    return (
      <div className="comment layout horizontal">
        <Avatar userId={this.props.comment.authorId} className='comment-author-avatar' />
        <div className="comment-content flex">
          <div className="comment-info layout horizontal">
            <div className="comment-author flex">{this.props.comment.authorName}</div>
            <div className="comment-age">{humanizedAge(this.props.comment.postedAt)}</div>
          </div>
          <div className="comment-body" dangerouslySetInnerHTML={this.renderBodyHTML()}></div>
        </div>
      </div>
    );
  }
});
