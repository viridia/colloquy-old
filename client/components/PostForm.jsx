// Form for editing a post
PostForm = React.createClass({
  componentDidMount() {
    // Set up the WYSIWYG editor.
    tinymce.init({
      selector: ".post-editor",
      elementpath: false,
      menubar: false,
      statusbar: false,
      resize: false,
      plugins: "link image codesample imagetools",
      // Note: codesample doesn't work that well, possibly remove. I'd like
      // to be able to apply the style to existing text.
      toolbar: "undo redo | formatselect | " +
               "bold italic underline strikethrough blockquote codesample removeformat | indent outdent | link image",
      body_class: "post-editor-body",
      content_style: ".post-editor-body {font-size: 16px}",
      height: 300,
    });

    // Subscribe to polymer events.
    this.postButton.addEventListener('tap', this.handlePost);
    this.cancelButton.addEventListener('tap', this.handleCancel);

    // Mark post button as initialy disabled.
    this.postButton.setAttribute("disabled", "");
  },

  handlePost(e) {
    // Handle clicking on the 'Post' button.
    console.log("Post", e);
    window.location = "/";
//    window.location = '/search/'+this.state.query+'/some-action';
  },

  // Handle clicking on the 'Cancel' button.
  handleCancel(e) {
    // TODO: Remove evil global.
    window.HISTORY.push("/");
  },

  render() {
    return (
      <form className="post-form layout vertical fit">
        <paper-input
            class="post-form-field-to"
            label="To:"
            ref={(el) => this.toField = el}></paper-input>
        <paper-input
            class="post-form-field-title no-label-float"
            label="Post Title"
            ref={(el) => this.titleField = el}></paper-input>
        <textarea
            className="post-editor post-form-field-body"></textarea>
        <div className="post-form-buttons layout horizontal end-justified">
          <paper-button
              class="post-form-cancel"
              ref={(el) => this.cancelButton = el}>Cancel</paper-button>
          <paper-button raised
              class="post-form-submit"
              ref={(el) => this.postButton = el}>Post</paper-button>
        </div>
      </form>
    );
  }
});
