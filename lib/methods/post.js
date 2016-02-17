/** Schema describing the post data produced by the post edit form. */
PostEditSchema = new SimpleSchema({
  // Mongo record id
  _id: {
    type: String,
    optional: true
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
});

Meteor.methods({
  /** Save a post to the database.
      @param post The content of the post.
      @param publish If true, set the post to a published state. Has no effect
          if the post has already been published.
   */
  post: function(postData:PostEditSchema, publish:bool) {
    PostEditSchema.validate(postData);
    const userId = this.userId;
    const user = Meteor.users.findOne(userId);
    const now = new Date();
    // TODO: Make sure that channels are valid.
    // TODO: Make sure current user has permission to post to this channel.
    // TODO: Enforce rate limits.

    if (postData._id) {
      throw new Meteor.Error('invalid-post-id', 'PostId should not be present for new post.');
    }

    const post = {
      authorId: userId,
      authorName: user.profile.name,
      editedAt: now,
      updatedAt: now,
      status: Status.DRAFT,
    };
    setPostContent(post, postData);
    setPostRecipients(post, postData);

    // Compute a unique slug for this post.
    // Strip all non-word characters and convert runs of spaces to dashes.
    var slug = post.title.toLowerCase()
        .replace(/[^\w ]/gm, '')
        .replace(/\s+/gm, '-');
    if (slug == '') {
      // Fallback if filtered slug is the empty string.
      slug = 'post';
    } else if (slug.length > 48) {
      // Trim the slug if it's really long.
      const sp = slug.indexOf('-', 48);
      if (sp > 0) {
        slug = slug.slice(0, sp);
      }
    }

    // Add an integer suffix if the slug is not unique.
    var slugIndex = 1;
    var slugPrefix = slug;
    while (true) {
      if (Posts.find({ slug: slug }).count() > 0) {
        slug = slugPrefix + (++slugIndex);
      } else {
        break;
      }
    }
    post.slug = slug;

    if (publish) {
      setPostStatusToPublished(post);
    }

    Posts.insert(post);
  },

  /** Update a post already in the database.
      @param post The content of the post.
      @param publish If true, set the post to a published state. Has no effect
          if the post has already been published.
   */
  editPost: function(postData:PostEditSchema, publish:bool) {
    PostEditSchema.validate(postData);
    const userId = this.userId;
    const user = Meteor.users.findOne(userId);
    const now = new Date();
    // TODO: Make sure current user has permission to post to this channel.
    // TODO: Enforce rate limits.
    // TODO: Do we want to allow them to change the slug? That will be hard to implement.

    if (!postData._id) {
      throw new Meteor.Error('missing-post-id', 'Missing post id');
    }

    const post = Posts.findOne(postData._id);
    if (!post) {
      throw new Meteor.Error('post-not-found', 'Attempt to edit a non-existing post.');
    }
    if (!canEditPost(post)) {
      throw new Meteor.Error('edit-not-allowed', 'You do not have permission to edit this post.');
    }

    const newPost = {
      editedAt: now,
      updatedAt: now,
    };
    setPostContent(newPost, postData);

    // Not allowed to change recipients once as post has been published.
    if (post.status == Status.DRAFT) {
      setPostRecipients(newPost, postData);
    }

    if (publish) {
      setPostStatusToPublished(newPost);
    }

    Posts.update(post._id, { $set: newPost }, (error, updateCount) => {
      if (error) {
        throw new Meteor.Error('post-edit-error', 'Post edit failed: ' + error);
      }
    });
  },

  // Increment the view count for a post.
  viewPost: function(postId) {
    Posts.update(postId, { $inc: { 'viewCount': 1 } });
  },

  // Increment the click count for a post.
  clickPost: function(postId) {
    Posts.update(postId, { $inc: { 'clickCount': 1 } });
  },

  // Add a 'like' to the post.
  likePost: function(postId) {
    Posts.update(postId, { $addToSet: { 'likes': this.userId } });
  },

  // Remove a 'like' from the post.
  unlikePost: function(postId) {
    Posts.update(postId, { $pull: { 'likes': this.userId } });
  },

  // Delete
  // Edit
  // Add Comment
});

// Sanitize the post title and body.
setPostContent = function(post, postData) {
  const title = UniHTML.purify(postData.title.trim(), { noFormatting: true });
  const body = UniHTML.purify(postData.body, { noFormatting: true });
  if (title == '') {
    throw new Meteor.Error('empty title', 'Post title cannot be empty.');
  }
  post.title = title;
  post.body = body;
}

// Ensure that post recipients are valid.
setPostRecipients = function(post, postData) {
  const recipientUsers = _.uniq(postData.recipientUsers);
  const recipientChannels = _.uniq(postData.recipientChannels);

  for (const id of recipientUsers) {
    if (Meteor.users.find({ '_id': id }).count() == 0) {
      throw new Meteor.Error('invalid-recipient-user', 'Invalid Recipient User ID');
    }
  }
  // Check that all recipient channels are valid and that we have
  // permission to post to them.
  // TODO: Implement
  // const channels = Channels.find({
  //   _id: { $in: recipientUsers }
  // });
  post.recipientUsers = recipientUsers;
  post.recipientChannels = recipientChannels;
}

// Set a post to the published state.
setPostStatusToPublished = function(post) {
  // Update post status if they want to publish.
  if (post.status == Status.DRAFT) {
    if (!post.recipientUsers && !post.recipientChannels) {
      throw new Meteor.Error('missing-recipients', 'No recipients specified.');
    }
    post.status = Status.PUBLISHED;
    post.postedAt = new Date();
    // TODO: Increment user post count.
  }
}

stripHTML = function(s) {
  return s.replace(/<(?:.|\n)*?>/gm, '');
};
