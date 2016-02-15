// Accounts configuration.
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

// We always want to know about users.
Tracker.autorun(function () {
  Meteor.subscribe("users");
});
