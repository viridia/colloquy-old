# TODO items

* Investigate Markdown / WYSIWYG editors
* Mock up new post page / panel
* Think about how to abstract collaborations
* Tests
* Patch in menu bug fix and get menus working
* Define collections schema
* Create some dummy data
* Add user account stuff
* Add avatars
* Remove insecure packages
* Chips widget
* Format Date intervals
* Research:
  * HTML Stripping
  * Late Loading
  * React Navigation

# collections

* Posts
* Comments
* Categories
* Users
* Settings
  * Include Badges and Post Read Markers

* Post
  * id
  * authorName
  * authorId
  * sticky
  * created
  * posted
  * title
  * body
  * url? slug?
  * htmlBody?
  * viewCount
  * commentCount
  * commenters
  * lastCommentedAt
  * clickCount
  * baseScore
  * upvotes
  * upVoters
  * status (pending / approved / rejected)
  * inactive / deleted
  * targetUserIds
  * targetGroupIds
  * category / tags / owner / collaboration
  * public

* Comment
  * id
  * authorName
  * authorId
  * created
  * parentPost
  * parentComment
  * body
  * deleted
