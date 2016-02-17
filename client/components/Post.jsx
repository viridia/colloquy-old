// Post component - represents a single post
Post = React.createClass({
  mixins: [ReactMeteorData, PolymerEventListener],

  getMeteorData () {
    var data = {
      post: {
        authorId: '',
        title: '',
        body: '',
        liked: false,
      },
      comments: []
    };

    var postsHandle = Meteor.subscribe('post', this.props.postId);
    if (postsHandle.ready()) {
      const post = Posts.findOne({ slug: this.props.postId });
      const userId = Meteor.userId();
      if (post) {
        data.post = post;
        data.age = humanizedAge(post.updatedAt);
        data.isLiked = _.contains(post.likes, userId);
        // Update the view count if the post id changed.
        if (Session.get('prevPost') != this.props.postId) {
          Session.set('prevPost', this.props.postId);
          Meteor.call('viewPost', post._id);
        }
      }
    }
    return data;

    // return {
    //   comments: [
    //     {
    //       authorName: 'Tasha',
    //       age: '2h',
    //       body: 'Lorem ipsum dolor sit amet, aliquam bibendum ultricies. ' +
    //             'In lorem magna adipiscing integer, nec tellus molestie neque ' +
    //             'risus vehicula.'
    //     },
    //   ]
    // }
  },

  getInitialState: function() {
    return { showCommentForm: false };
  },

  handleEdit() {
    window.HISTORY.push("/post/" + this.data.post.slug);
  },

  handleDelete() {
    console.log('Delete');
  },

  handleLike() {
    if (this.data.isLiked) {
      Meteor.call('unlikePost', this.data.post._id);
    } else {
      Meteor.call('likePost', this.data.post._id);
    }
  },

  handleReply() {
    this.setState({ showCommentForm: true });
  },

  handleCloseComment() {
    this.setState({ showCommentForm: false });
  },

  handleAddReply() {
    console.log('add reply');
  },

  renderBodyHTML() {
    return { __html: this.data.post.body };
  },

  renderLikeButton() {
    // Polymer needs the 'active' attribute to be completely gone, but React only auto-removes
    // falsy attributes if they are native.
    if (this.data.isLiked) {
      return (<paper-icon-button class='like-button' icon='favorite' toggles active
          on-tap="handleLike"></paper-icon-button>);
    } else {
      return (<paper-icon-button class='like-button' icon='favorite' toggles
          on-tap="handleLike"></paper-icon-button>);
    }
  },

  renderEditButton() {
    if (this.data.post && canEditPost(this.data.post)) {
      return <paper-icon-button icon='create' on-tap="handleEdit"></paper-icon-button>
    } else {
      return '';
    }
  },

  renderDeleteButton() {
    if (this.data.post && canEditPost(this.data.post)) {
      return <paper-icon-button icon='delete' on-tap="handleDelete"></paper-icon-button>
    } else {
      return '';
    }
  },

  renderComments() {
    if (this.data.comments.length > 0) {
      return (
        <div className='post-comments'>
          {this.data.comments.map(this.renderComment)}
        </div>);
    } else {
      return '';
    }
  },

  renderComment(comment, index) {
    return <Comment comment={comment} key={index}></Comment>
  },

  render() {
    if (!this.data.post) {
      return <div></div>
    }
    return (
      <paper-card>
        <div className='card-content post layout horizontal'>
          <Avatar userId={this.data.post.authorId} className='post-author-avatar' />
          <div className='post-content flex'>
            <div className='post-info layout horizontal'>
              <div className='post-author'>{this.data.post.authorName}</div>
              &nbsp;-&nbsp;
              <div className='post-title'>{this.data.post.title}</div>
              &nbsp;&raquo;&nbsp;
              <div className='post-visibility flex'>Public</div>
              <div className='post-age'>{this.data.age}</div>
            </div>
            <div className='post-body'
                dangerouslySetInnerHTML={this.renderBodyHTML()}></div>
          </div>
        </div>
        <div className='post-attachments layout horizontal wrap'>
          <div className='post-image-1'></div>
          <div className='post-image-2'></div>
          <div className='post-image-3'></div>
          <div className='post-image-4'></div>
        </div>
        {this.renderComments()}
        <div className='post-buttons layout horizontal end-justified center'>
          {this.renderLikeButton()}
          {this.renderEditButton()}
          {this.renderDeleteButton()}
          <paper-button on-tap="handleReply">
            <iron-icon icon='reply'></iron-icon>
            Reply
          </paper-button>
        </div>
        {this.state.showCommentForm ?
            <CommentForm postId={this.data.post._id} onClose={this.handleCloseComment} /> : ''}
      </paper-card>
    );
  }
});
