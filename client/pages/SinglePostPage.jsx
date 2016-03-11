import React from 'react';

// A Page showing a single post
SinglePostPage = React.createClass({
  render() {
    return (
      <paper-header-panel className="flex">
        <AppBar />
        <div className="post-list">
          <Post postSlug={this.props.params.postId}></Post>
        </div>
      </paper-header-panel>
    );
  }
});

export default PostListPage;
