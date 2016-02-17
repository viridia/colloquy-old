// This file contains various helper functions that determine whether the
// user is permitted to perform various actions.
canEditPost = function(post) {
  if (post.authorId == Meteor.userId()) {
    return true;
  }
  return false;
}
