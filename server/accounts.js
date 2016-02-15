Accounts.onCreateUser(function(options, user) {
  ensureProfile(user);
  user.profile.avatarUrl = Avatar.getUrl(user);
  return user;
});

Accounts.onLogin(function(info) {
  // Note we don't use shortcut || operator here.
  const url = Avatar.getUrl(info.user);
  if (!info.user.profile || !info.user.profile.avatarUrl) {
    Meteor.users.update(Meteor.userId(), {$set: {"profile.avatarUrl": url}});
  }
  return true;
});
