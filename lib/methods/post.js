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
    label: "List of Recipient User Ids"
  },
  // List of recipients that are channels.
  recipientChannels: {
    type: [String],
    optional: true,
    label: "List of Recipient Channel Ids"
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
});

Meteor.methods({
  /** Save a post to the database.
      @param post The content of the post.
      @param publish If true, set the post to a published state. Has no effect
          if the post has already been published.
   */
  post: function(postData:PostEditSchema, publish:bool) {
    PostEditSchema.validate(postData);
    const recipientUsers = _.uniq(postData.recipientUsers);
    const recipientChannels = _.uniq(postData.recipientChannels);
    const title = UniHTML.purify(postData.title.trim(), { noFormatting: true });
    const body = UniHTML.purify(postData.body, { noFormatting: true });
    const userId = this.userId;
    const user = Meteor.users.findOne(userId);
    // TODO: Make sure that channels are valid.
    // TODO: Make sure current user has permission to post to this channel.
    // TODO: Enforce rate limits.
    // TODO: Compute post slug.
    // TODO: Increment user post count.

    // Check that all recipient users are valid.
    for (const id of recipientUsers) {
      if (Meteor.users.find({ "_id": id }).count() == 0) {
        throw new Meteor.Error("Invalid Recipient User ID");
      }
    }

    // Check that all recipient channels are valid and that we have
    // permission to post to them.
    // TODO: Implement
    // const channels = Channels.find({
    //   _id: { $in: recipientUsers }
    // });

    if (postData._id) {
      // TODO: Implement. Also, only update title and body.
      throw new Error("Not implemented");
    }

    const post = {
      authorId: userId,
      authorName: user.profile.name,
      recipientUsers: recipientUsers,
      recipientChannels: recipientChannels,
      editedAt: new Date(),
      title: title,
      body: body,
      status: Status.DRAFT,
    };

    // Update post status if they want to publish.
    if (publish && post.status == Status.DRAFT) {
      post.status = Status.PUBLISHED;
      post.postedAt = post.editedAt;
    }

    // A non-draft post must have some recipients.
    if (post.status != Status.DRAFT) {
      if (!recipientUsers && !recipientChannels) {
        throw new Meteor.Error("No recipients specified.");
      }
    }

    console.log("post", post);

    post._id = Posts.insert(post);

    // /** Schema for a post record. */
    // PostSchema = new SimpleSchema({
    //   // Unique identifier of this post used in URL.
    //   slug: {
    //     type: String,
    //     optional: true
    //   },
    // });
  },
});

if (Meteor.isServer) {
  Meteor.publish("posts", function() {
    return Posts.find();
  });
}

stripHTML = function(s) {
  return s.replace(/<(?:.|\n)*?>/gm, '');
};