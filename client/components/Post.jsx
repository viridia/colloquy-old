// Post component - represents a single post
Post = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    var data = {
      authorName: "",
      title: "",
      body: "",
      comments: []
    };

    var handle = Meteor.subscribe("posts");
    if (handle.ready()) {
      const post = Posts.findOne({ slug: this.props.postId });
      if (post) {
        data.authorName = post.authorName;
        data.title = post.title;
        data.body = post.body;
      }
    }
    return data;

    // return {
    //   age: "6h",
    //   comments: [
    //     {
    //       authorName: "Tasha",
    //       age: "2h",
    //       body: "Lorem ipsum dolor sit amet, aliquam bibendum ultricies. " +
    //             "In lorem magna adipiscing integer, nec tellus molestie neque " +
    //             "risus vehicula."
    //     },
    //     {
    //       authorName: "Ted Goldstein",
    //       age: "20m",
    //       body: "Praesent rhoncus, egestas est scelerisque suspendisse, " +
    //             "lacus donec vel volutpat eu morbi mi, adipiscing et sapien " +
    //             "nullam magna sint maecenas, excepturi non bibendum mi in."
    //     },
    //   ]
    // }
  },

  renderBodyHTML() {
    return { __html: this.data.body };
  },

  renderComments() {
    if (this.data.comments.length > 0) {
      return (
        <div className="post-comments">
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
    return (
      <paper-card>
        <div className="card-content post layout horizontal">
          <div className="post-author-avatar"></div>
          <div className="post-content flex">
            <div className="post-info layout horizontal">
              <div className="post-author">{this.data.authorName}</div>
              &nbsp;-&nbsp;
              <div className="post-title">{this.data.title}</div>
              &nbsp;&raquo;&nbsp;
              <div className="post-visibility flex">Public</div>
              <div className="post-age">{this.data.age}</div>
            </div>
            <div className="post-body"
                dangerouslySetInnerHTML={this.renderBodyHTML()}></div>
          </div>
        </div>
        <div className="post-attachments layout horizontal wrap">
          <div className="post-image-1"></div>
          <div className="post-image-2"></div>
          <div className="post-image-3"></div>
          <div className="post-image-4"></div>
        </div>
        {this.renderComments()}
        <div className="post-comment-form layout horizontal">
          <iron-autogrow-textarea
              class="post-comment-input flex self-center"
              placeholder="Add a comment..."></iron-autogrow-textarea>
          <paper-button >Post</paper-button>
        </div>
      </paper-card>
    );
  }
});
