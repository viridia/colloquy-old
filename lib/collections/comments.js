CommentSchema = new SimpleSchema({
  // Mongo record id
  _id: {
    type: String,
    optional: true
  },
  // Datestamp for when this comment was added.
  postedAt: {
    type: Date,
    optional: true
  },
  // Friendly name of the comment author.
  authorName: {
    type: String,
    optional: true,
    label: "Author Name"
  },
  authorId: {
    type: String,
    optional: true,
    label: "Author User Id"
  },
  // HTML body of the comment.
  body: {
    type: String,
    optional: true,
    label: "HTML Comment Body"
  },
  // The post that this is commmenting on.
  parentPost: {
    type: String,
    label: "Id of Parent Post"
  },
  // If this is a comment-to-comment, then the id of the parent comment.
  // Note that only one level of comment nesting is allowed.
  parentComment: {
    type: String,
    optional: true,
    label: "Id of Parent Comment"
  },
  // Users who liked this comment.
  likes: {
    type: [String],
    defaultValue: [],
    label: 'List of User Ids Who Liked This Comment'
  },
  // * baseScore
  // * status (pending / approved / rejected)
  // * inactive / deleted
});
Comments = new Meteor.Collection("colloquy_comments");
Comments.attachSchema(CommentSchema);

// Subscriptions & Indices
if (Meteor.isServer) {
  // Subscription for comments beloning to a single post, indexed by post id.
  Meteor.publish('comments', function(postId) {
    return Posts.find({ parentPost: postId });
  });

  Meteor.startup(function() {
    // The client often looks up posts by the slug.
    Posts._ensureIndex({ 'parentPost': 1});
  });
}
