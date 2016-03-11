Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    user.profile = options.profile;
  }
  if (!user.profile) {
    user.profile = {};
  }
  user.profile.avatarUrl = Avatar.getUrl(user);
  // Ensure that there is always a profile name.
  if (!user.profile.name) {
    if (user.username) {
      user.profile.name = user.username;
    } else {
      // Otherwise throw an error?
    }
  }
  return user;
});

Accounts.onLogin(function(info) {
  // We should assert that there is a profile object.
  const url = Avatar.getUrl(info.user);
  // Update the avatar url for this user which may have changed.
  if (info.user.profile.avatarUrl != url) {
    Meteor.users.update(Meteor.userId(), {$set: {"profile.avatarUrl": url}});
  }
  return true;
});
