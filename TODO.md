# TODO items

## Next Steps

* Add user account stuff - login, etc.
* What format are author ids?
* Tests
* Form submit handler

## Future Steps

* Think about how to abstract collaborations
* Figure out how to use flex sizing with TinyMCE.
* Patch in menu bug fix and get menus working
* Define collections schema
* Architecture for notifications
* Architecture for Badges
* Create some dummy data
* Add avatars
* Remove insecure packages
* Chips widget
* Format Date intervals (6h ago, etc.)
* Research:
  * HTML Stripping / Sanitization
* Do we want to use an issue tracker instead of this file?
* Create color definitions for primary buttons
* Figure out how to set custom css properties in react files.
* Need a much better account creation / login UI.
* Implement the 'not found' page (NotFoundRoute).

## Collections

* Posts
* Comments
* Categories
* Users / Accounts
* UserRef
* Settings
  * Include Badges and Post Read Markers
* Notifications

## Server side app structure

* Methods
  * New Post
  * Edit Post
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
