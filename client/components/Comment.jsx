// Comment component - represents a commment to a post
Comment = React.createClass({
  renderBodyHTML() {
    return { __html: this.props.comment.body };
  },

  renderLikeButton() {
    // Polymer needs the 'active' attribute to be completely gone, but React only auto-removes
    // falsy attributes if they are native.
    const userId = Meteor.userId();
    const isLiked = _.contains(this.props.comment.likes, userId);
    if (isLiked) {
      return (<paper-icon-button class='like-button' title="Like Comment"
          icon='favorite' toggles active
          on-tap="handleLike"></paper-icon-button>);
    } else {
      return (<paper-icon-button class='like-button' title="Like Comment"
                  icon='favorite' toggles
                  on-tap="handleLike"></paper-icon-button>);
    }
  },

  renderEditButton() {
    if (canEditComment(this.props.comment)) {
      return (<paper-icon-button icon='create'
                  title="Edit Comment" on-tap="handleEdit"></paper-icon-button>);
    } else {
      return '';
    }
  },

  renderDeleteButton() {
    if (canEditComment(this.props.comment)) {
      return (<paper-icon-button icon='delete'
                  title="Delete Comment" on-tap="handleDelete"></paper-icon-button>);
    } else {
      return '';
    }
  },

  render() {
    return (
      <div className="comment layout horizontal">
        <style is="custom-style">{`
          .comment-info paper-icon-button {
            padding: 1px;
            --paper-icon-button: {
              width: 20px;
              height: 20px;
            }
          }
        `}
        </style>
        <Avatar userId={this.props.comment.authorId} className='comment-author-avatar' />
        <div className="comment-content flex">
          <div className="comment-info layout horizontal">
            <div className="comment-author flex">{this.props.comment.authorName}</div>
            {this.renderLikeButton()}
            {this.renderEditButton()}
            {this.renderDeleteButton()}
            <div className="comment-age">{humanizedAge(this.props.comment.postedAt)}</div>
          </div>
          <div className="comment-body" dangerouslySetInnerHTML={this.renderBodyHTML()}></div>
        </div>
      </div>
    );
  }
});
