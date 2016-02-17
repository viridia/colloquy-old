# TODO items

## Next Steps

* Explore embeds.
* Publish channels to the client (right now two independent collections).
  * This requires seeding.
  * Also requires thinking about how we're going to integrate with MedBook.
* Generate initials for channel avatars.
* Publish channels on the client.
  * Fix up every place where we aren't lookup up a channel.
* Single post page.
  * Comment entry
  * Comment display
  * Attachments
  * Embedding
* Add user account stuff - login, etc.
* Tests
* Publish the user's api key to the client, and then use in autocomplete.
* Do we want to prevent chips from accepting invalid names?

## Bugs:

* Figure out why TinyMCE is reporting a JS error.

## Future Steps

* I'd really like a better way to subscribe to tap events.
* Think about how we're going to store the 'read state' per post per user.
* Think about how to hide MedBook collaborations behind an interface.
* Figure out how to use flex sizing with TinyMCE.
* Patch in menu bug fix and get menus working
* Architecture for notifications
* Architecture for Badges
* Do we want to use an issue tracker instead of this file?
* Figure out how to set custom css properties in react files.
  * The notification badge is a good test example.
* Need a much better account creation / login UI.
* Implement the 'not found' page (NotFoundRoute).
* Put the user's avatar in the app bar. (Requires learning details of
  Meteor accounts ui buttons.)
* Handle async uploading of images in TinyMCE.
  * Including waiting for uploads to finish.

## Collections

* Posts
* Comments
* Channels
* Settings
  * Include Badges and Post Read Markers
* Notifications

## Server side app structure

* Methods
  * Posting
    * Delete Post
    * Approve Post
    * Unapprove Post
    * Bump Post Clicks

  * New Comment
  * Edit Comment
  * List Post Summaries (query)
  * Get Post
  * View Notifications
  * Share Post
  * Get Settings
  * Update Settings
  * Create Account
  * Admin

server/
  post/
    methods/
  ranking/
  settings/
  account/
