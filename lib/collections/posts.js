/** Enumeration for post status. */
Status = {
  DRAFT: 0,       // Saved as draft
  PUBLISHED: 1,   // Visible
  DELETED: 2,     // Deleted
};

/** Schema for a post record. */
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
  // Datestamp for when this was last edited.
  editedAt: {
    type: Date,
    optional: true,
  },
  // Contains the more recent of either editedAt or lastCommentedAt.
  updatedAt: {
    type: Date,
    optional: true,
  },
  // Friendly name of the author
  authorName: {
    type: String,
    optional: true,
    label: 'Author Name'
  },
  authorId: {
    type: String,
    label: 'Author User Id'
  },
  // List of recipients that are individual users.
  recipientUsers: {
    type: [String],
    optional: true,
    label: 'List of Recipient User Ids'
  },
  // List of recipients that are channels.
  recipientChannels: {
    type: [String],
    optional: true,
    label: 'List of Recipient Channel Ids'
  },
  // Unique identifier of this post used in URL.
  slug: {
    type: String,
    optional: true
  },
  // Title of the post.
  title: {
    type: String,
    label: 'Title'
  },
  // HTML content of the post.
  body: {
    type: String,
    label: 'HTML Post Body'
  },
  // Post status code
  status: {
    type: Number,
    optional: false,
  },
  // List of user ids for users who have commented on the post.
  commenters: {
    type: [String],
    optional: true,
    label: 'List of Commenter User Ids'
  },
  // Total number of comments.
  commentCount: {
    type: Number,
    optional: false,
    defaultValue: 0,
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
    defaultValue: 0,
  },
  // Number of times this post has been clicked.
  clickCount: {
    type: Number,
    optional: false,
    defaultValue: 0,
  },
  // Users who liked this post.
  likes: {
    type: [String],
    defaultValue: [],
    label: 'List of User Ids Who Liked This Post'
  },
  // Whether this post should always appear at the top of the list of posts.
  sticky: {
    type: Boolean,
    optional: true,
  },
  // * baseScore
});

Posts = new Meteor.Collection('colloquy_posts');
Posts.attachSchema(PostSchema);

// Subscriptions & Indices
if (Meteor.isServer) {
  // Subscription for a list of posts.
  Meteor.publish('posts', function() {
    return Posts.find({});
  });
  // Subscription for a single post, indexed by slug.
  Meteor.publish('post', function(postId) {
    return Posts.find({ slug: postId });
  });

  Meteor.startup(function() {
    // The client often looks up posts by the slug.
    Posts._ensureIndex({ 'slug': 1});
  });
}
