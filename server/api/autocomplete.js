function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

// API endpoint for fetching list of recipients that match a query token.
// Used by the paper-input-autocomplete-chips widget.
HTTP.methods({
  'api/recipients': {
    get: function(data) {
      // if (!this.userId) {
      //   this.setStatusCode(401); // Unauthorized
      //   return "Unauthorized";
      // }
      // var user = Meteor.users.findOne({ _id: this.userId });

      // Prepare the query string for regex search.
      var query = this.query.q;
      if (!query) {
        return "";
      }
      const queryRegex = "\\b" + escapeRegExp(query);

      // Search channels
      // TODO: We only want to search channels the user can post to.
      const channels = Channels.find({
        name: { $regex: queryRegex }
      });

      // Search users
      const users = Meteor.users.find({
        "profile.name": { $regex: queryRegex }
      });

      // Process the results.
      const channelResults = channels.map((ch) => {
        return {
          key: ch._id,
          text: ch.name,
          tag: "channel",
//          imgUrl: ??
        };
      });
      const userResults = users.map((u) => {
        return {
          key: u._id,
          text: u.profile.name,
          tag: "user",
        };
      });
      this.setContentType("application/json");
      return JSON.stringify(channelResults.concat(userResults));
  }}
});
