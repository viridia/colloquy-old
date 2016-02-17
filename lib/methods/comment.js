/** Schema describing the post data produced by the post edit form. */
CommentEditSchema = new SimpleSchema({
  // Mongo record id
  _id: {
    type: String,
    optional: true
  },
  parentPost: {
    type: String,
    label: 'ID of post this is commenting on'
  },
  parentComment: {
    type: String,
    optional: true,
    label: 'ID of comment this is commenting on'
  },
  body: {
    type: String,
    label: 'HTML Comment Body'
  },
});

Meteor.methods({
  /** Save a post to the database.
      @param commentData The content of the comment.
   */
  addComment: function(commentData:CommentEditSchema) {
    CommentEditSchema.validate(commentData);
    const userId = this.userId;
    const user = Meteor.users.findOne(userId);
    const now = new Date();
    // TODO: Make sure current user has permission to post to this channel.
    // TODO: Enforce rate limits.
    // TODO: Ensure postId is valid.

    if (commentData._id) {
      throw new Meteor.Error('invalid-comment-id',
          'Comment id should not be present for new comment.');
    }
    if (!commentData.parentPost) {
      throw new Meteor.Error('missing-comment-post-id',
          'Missing parent post id for comment.');
    }
    if (!Meteor.isSimulation) {
      // Don't bother looking up parent post on the client.
      const post = Posts.findOne(commentData.parentPost);
      if (!post) {
        throw new Meteor.Error('invalid-comment-post-id',
            'Invalid parent post id for comment.');
      }
    }

    const comment = {
      authorId: userId,
      authorName: user.profile.name,
      editedAt: now,
      parentPost: commentData.parentPost,
    };

    if (commentData.parentComment) {
      // TODO: Ensure parent comment is valid and not nested.
      comment.parentComment = commentData.parentComment;
    }

    setCommentContent(comment, commentData);
    Comments.insert(comment);
  },

  /** Update a post already in the database.
      @param post The content of the post.
      @param publish If true, set the post to a published state. Has no effect
          if the post has already been published.
   */
  editComment: function(commentData:CommentEditSchema) {
    CommentEditSchema.validate(commentData);
    const userId = this.userId;
    const user = Meteor.users.findOne(userId);
    const now = new Date();
    // TODO: Make sure current user has permission to post to this channel.
    // TODO: Enforce rate limits.

    if (!commentData._id) {
      throw new Meteor.Error('missing-comment-id', 'Missing comment id');
    }

    const comment = Comments.findOne(commentData._id);
    if (!comment) {
      throw new Meteor.Error('comment-not-found', 'Attempt to edit a non-existing comment.');
    }
    if (!canEditComment(comment)) {
      throw new Meteor.Error('edit-not-allowed',
          'You do not have permission to edit this comment.');
    }

    const newComment = {};
    setPostContent(newComment, commentData);

    Comments.update(comment._id, { $set: newComment }, (error, updateCount) => {
      if (error) {
        throw new Meteor.Error('comment-edit-error', 'Comment edit failed: ' + error);
      }
    });
  },

  // Add a 'like' to the commment.
  likeComment: function(postId) {
    // Posts.update(postId, { $addToSet: { 'likes': this.userId } });
  },

  // Remove a 'like' from the comment.
  unlikeComment: function(postId) {
    // Posts.update(postId, { $pull: { 'likes': this.userId } });
  },

  // Delete
});

// Sanitize the comment body.
setCommentContent = function(comment, commentData) {
  const body = UniHTML.purify(commentData.body, { noFormatting: true });
  if (body == '') {
    throw new Meteor.Error('empty body', 'Comment body cannot be empty.');
  }
  comment.body = body;
}
