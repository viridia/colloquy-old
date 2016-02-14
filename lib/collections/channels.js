// A 'Channel' is a subsection of a forum dedicated to a certain set of topics.
ChannelSchema = new SimpleSchema({
  // Mongo record id
  _id: {
    type: String,
    optional: true
  },
  // Name of this channel.
  name: {
    type: String,
  },
});
// Note that this is a local, unsynchronized collection for now.
Channels = new Meteor.Collection(null/*"colloquy-channels"*/);
Channels.attachSchema(ChannelSchema);

// Initialize the set of channels.
Meteor.startup(function () {
  Channels.insert({ "name": "Dogfood" });
  Channels.insert({ "name": "Test" });
});
