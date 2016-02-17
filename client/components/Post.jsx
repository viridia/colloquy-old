// Post component - represents a single post
Post = React.createClass({
  mixins: [ReactMeteorData, PolymerEventListener],

  getMeteorData () {
    var data = {
      post: {
        authorId: '',
        title: '',
        body: '',
      },
      comments: []
    };

    var postsHandle = Meteor.subscribe('post', this.props.postId);
    if (postsHandle.ready()) {
      const post = Posts.findOne({ slug: this.props.postId });
      if (post) {
        data.post = post;
        data.age = humanizedAge(post.editedAt);
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

  handleEdit() {
    console.log('Edit');
  },

  handleDelete() {
    console.log('Delete');
  },

  handleLike() {
    console.log('Like');
  },

  handleReply() {
    console.log('Reply');
  },

  renderBodyHTML() {
    return { __html: this.data.post.body };
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
        <div className='post-buttons layout horizontal end-justified'>
          <paper-icon-button icon='favorite'
              on-tap="handleLike"></paper-icon-button>
          {this.renderEditButton()}
          {this.renderDeleteButton()}
          <paper-button on-tap="handleReply">
            <iron-icon icon='reply'></iron-icon>
            Reply
          </paper-button>
        </div>
        <div className='post-comment-form layout horizontal'>
          <iron-autogrow-textarea
              class='post-comment-input flex self-center'
              placeholder='Write a reply...'></iron-autogrow-textarea>
            <paper-button >Reply</paper-button>
        </div>
      </paper-card>
    );
  }
});
