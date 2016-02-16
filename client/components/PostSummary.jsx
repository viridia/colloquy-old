const { Link } = ReactRouter;

// Post summary - a single entry in the post summary list.
PostSummary = React.createClass({
  render() {
    const post = this.props.post;
    return (<tr className="post-summary-data" key={this.props.key}>
      <td className="topic">
        <div className="layout horizontal">
          <Avatar className="author-avatar avatar-small" userId={post.authorId} />
          <Link to={"/single/" + post.slug} className="topic-link flex layout horizontal">
            <div className="author">{post.authorName}</div>
            <div className="author-sep">&raquo;</div>
            <div className="title flex">{post.title}</div>
          </Link>
      </div>
      </td>
      <td className="to">
        { post.recipientUsers.slice(0, 5).map((id) => <Avatar className="avatar-small" userId={id} key={"user:" + id} />) }
        { post.recipientChannels.slice(0, 2).map((id) => <Avatar className="avatar-small" channelId={id} key={"channel:" + id} />) }
      </td>
      <td className="replies">{post.commentCount}</td>
      <td className="views">{post.viewCount}</td>
      <td className="activity">{humanizedAge(post.editedAt)}</td>
    </tr>);
  }
});
