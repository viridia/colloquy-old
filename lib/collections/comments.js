CommentSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  postedAt: {
    type: Date,
    optional: true
  },
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
  body: {
    type: String,
    optional: true,
    label: "HTML Comment Body"
  },
  parentPost: {
    type: String,
    optional: true,
    label: "Id of Parent Post"
  },
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
