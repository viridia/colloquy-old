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
  // * baseScore
  // * upvotes
  // * upVoters
  // * status (pending / approved / rejected)
  // * inactive / deleted
});
Comments = new Meteor.Collection("colloquy-comments");
Comments.attachSchema(CommentSchema);
