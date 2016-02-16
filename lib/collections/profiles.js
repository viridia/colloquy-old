// Profiles are stored in the users table.
// TODO: Create a schema for profile info.

if (Meteor.isServer) {
  // Publish profile data for users.
  Meteor.publish("users", function() {
    return Meteor.users.find({}, {
      fields: {
        "profile.name": 1,
        "profile.avatarUrl": 1,
      }
    });
  });
}
