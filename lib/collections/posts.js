PostSchema = new SimpleSchema({
  // Mongo record id
  _id: {
    type: String,
    optional: true
  },
  // Datestamp for when this was posted.
  postedAt: {
    type: Date,
    optional: true,
  },
  // Friendly name of the author
  authorName: {
    type: String,
    optional: true,
    label: "Author Name"
  },
  authorId: {
    type: String,
    label: "Author User Id"
  },
  // List of recipients that are individual users.
  recipientUsers: {
    type: [String],
    optional: true,
    label: "List of Recipient User Ids"
  },
  // List of recipients that are groups.
  recipientGroups: {
    type: [String],
    optional: true,
    label: "List of Recipient Group Ids"
  },
  // Unique identifier of this post used in URL.
  slug: {
    type: String,
    optional: true
  },
  // Title of the post.
  title: {
    type: String,
    label: "Title"
  },
  // HTML content of the post.
  body: {
    type: String,
    label: "HTML Post Body"
  },
  // List of user ids for users who have commented on the post.
  commenters: {
    type: [String],
    optional: true,
    label: "List of Commenter User Ids"
  },
  // Total number of comments.
  commentCount: {
    type: Number,
    optional: false,
  },
  // Timestamp of the most recent comment.
  lastCommentedAt: {
    type: Date,
    optional: true,
  },
  // Number of times this post has been viewed.
  viewCount: {
    type: Number,
    optional: false,
  },
  clickCount: {
    type: Number,
    optional: false,
  },
  // Whether this post should always appear at the top of the list of posts.
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
