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
  // Whether this channel is visible to all users.
  public: {
    type: Boolean,
    optional: true,
  },
});

// Note that this is a local, unsynchronized collection for now.
// TODO: Make this a Mongo collection once we have a way to create channels.
Channels = new Meteor.Collection(null/*"colloquy_channels"*/);
Channels.attachSchema(ChannelSchema);

// Initialize the set of channels.
Meteor.startup(function () {
  Channels.insert({ "name": "Dogfood", public: true });
  Channels.insert({ "name": "Test" });
});