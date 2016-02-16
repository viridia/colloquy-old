# TODO items

## Next Steps

* Single post page.
  * Post age.
  * Comment entry
  * Comment display
  * Attachments
  * Embedding
* Add user account stuff - login, etc.
* Tests
* Publish the user's api key to the client, and then use in autocomplete.

## Bugs:

* Figure out why TinyMCE is reporting a JS error.

## Future Steps

* Think about how to hide MedBook collaborations behind an interface.
* Figure out how to use flex sizing with TinyMCE.
* Patch in menu bug fix and get menus working
* Architecture for notifications
* Architecture for Badges
* Format Date intervals (6h ago, etc.)
* Do we want to use an issue tracker instead of this file?
* Figure out how to set custom css properties in react files.
* Need a much better account creation / login UI.
* Implement the 'not found' page (NotFoundRoute).
* Put the user's avatar in the app bar. (Requires learning details of
  Meteor accounts ui buttons.)
* Handle async uploading of images in TinyMCE.
  * Including waiting for uploads to finish.

## Collections

* Posts
* Comments
* Categories / Channels
* Settings
  * Include Badges and Post Read Markers
* Notifications

## Server side app structure

* Methods
  * Posting
    * Save Post
      * Option: Save Draft (don't publish)
      * Option: Edit Existing Post
    * Delete Post
    * Approve Post
    * Unapprove Post
    * Bump Post Views
    * Bump Post Clicks

  * New Comment
  * Edit Comment
  * List Post Summaries (query)
  * Get Post
  * View Post
  * View Notifications
  * Like Post
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
