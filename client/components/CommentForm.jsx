// Form for editing a comment
CommentForm = React.createClass({
  mixins: [PolymerEventListener],

  componentDidMount() {
    // Set up the WYSIWYG editor.
    tinymce.init({
      selector: '.post-comment-input',
      elementpath: false,
      menubar: false,
      statusbar: false,
      inline: true,
      plugins: 'link image imagetools',
      toolbar: 'undo redo | ' +
               'bold italic underline strikethrough blockquote removeformat | ' +
               'bullist numlist | ' +
               'link image',
      body_class: 'comment-editor-body',
      content_style: '.comment-editor-body {font-size: 16px}',
      height: 100,
    });
    tinyMCE.activeEditor.focus();
  },

  // Handle clicking on the 'Done' button.
  handleDone(e) {
    var commentText = tinymce.activeEditor.getContent();
    if (commentText) {
      const params = {
        parentPost: this.props.postId,
        body: commentText,
      };
      var method = 'addComment';
      Meteor.call(method, params, (error, result) => {
        if (error) {
          this.errorDialog.show(error.reason);
        } else {
          this.props.onClose();
        }
      });
    } else {
      this.props.onClose();
    }
  },

  // Handle clicking on the 'Cancel' button.
  handleCancel(e) {
    this.props.onClose();
  },

  render() {
    return (
      <div className='post-comment-form layout horizontal center'>
        <div
            className='post-comment-input flex self-center'
            autofocus
            placeholder='Write a reply...'></div>
          <paper-icon-button icon='done' on-tap='handleDone'></paper-icon-button>
          <paper-icon-button icon='cancel' on-tap='handleCancel'></paper-icon-button>
          <ErrorDialog ref={(el) => this.errorDialog = el} />
      </div>
    );
  }
});
