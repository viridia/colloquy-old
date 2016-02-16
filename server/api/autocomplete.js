function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

// API endpoint for fetching list of recipients that match a query token.
// Used by the paper-input-autocomplete-chips widget.
HTTP.methods({
  'api/recipients': {
    get: function(data) {
      // TODO: Re-enable this code once we publish the user's API key to the
      // client.
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
        name: { $regex: queryRegex, $options: "i" }
      });

      // Search users
      // TODO: Do we also want to search by other attributes such as email?
      // Note that email isn't stored in one single location, it depends on
      // how they logged in.
      const users = Meteor.users.find({
        $or: [
          { "username": { $regex: queryRegex, $options: "i" } },
          { "profile.name": { $regex: queryRegex, $options: "i" } }
        ]
      });

      // Process the results and produce a JSON object that is suitable for
      // consumption by the polymer autocomplete widget.
      const channelResults = channels.map((ch) => {
        return {
          text: ch.name,
          tag: "channel:" + ch._id,
//          imgUrl: ??
        };
      });
      const userResults = users.map((u) => {
        return {
          text: u.profile.name,
          tag: "user:" + u._id,
          imgUrl: u.profile.avatarUrl,
        };
      });
      this.setContentType("application/json");
      return JSON.stringify(channelResults.concat(userResults));
  }}
});
