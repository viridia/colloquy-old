PostSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  postedAt: {
    type: Date,
    optional: true,
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
  recipientUsers: {
    type: [String],
    optional: true,
    label: "List of Recipient User Ids"
  },
  recipientGroups: {
    type: [String],
    optional: true,
    label: "List of Recipient Group Ids"
  },
  slug: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    optional: true,
    label: "Title"
  },
  body: {
    type: String,
    optional: true,
    label: "HTML Post Body"
  },
  commenters: {
    type: [String],
    optional: true,
    label: "List of Commenter User Ids"
  },
  commentCount: {
    type: Number,
    optional: false,
  },
  lastCommentedAt: {
    type: Date,
    optional: true,
  },
  viewCount: {
    type: Number,
    optional: false,
  },
  clickCount: {
    type: Number,
    optional: false,
  },
  sticky: {
    type: Boolean,
    optional: true,
  },
  // * baseScore
  // * upvotes
  // * upVoters
  // * status (pending / approved / rejected)
  // * inactive / deleted
  // * public
});
Posts = new Meteor.Collection("colloquy-posts");
Posts.attachSchema(PostSchema);
