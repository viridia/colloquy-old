const { Link } = ReactRouter;

// Post summary - a single entry in the post summary list.
PostSummary = React.createClass({
  render() {
    const post = this.props.post;
    return (<tr className="post-summary-data" key={this.props.key}>
      <td className="topic">
        <Link to={"/single/" + post.slug} className="topic-link">
          {post.title}
        </Link>
      </td>
      <td className="from">{post.authorName}</td>
      <td className="to">(t)</td>
      <td className="replies">{post.commentCount}</td>
      <td className="views">{post.viewCount}</td>
      <td className="activity">(act)</td>
    </tr>);
  }
});
