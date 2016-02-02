// Form for editing a post
PostForm = React.createClass({
  componentDidMount() {
    tinymce.init({
      selector: "#post-editor",
      elementpath: false,
      menubar: false,
      statusbar: false,
      resize: false,
      plugins: "link image codesample imagetools",
      toolbar: "undo redo | formatselect | " +
               "bold italic underline strikethrough blockquote codesample removeformat | indent outdent | link image",
      body_class: "post-editor-body",
      content_style: ".post-editor-body {font-size: 16px}",
      height: 300,
    });
  },
  render() {
    return (
      <form className="post-form layout vertical fit">
        <paper-input className="post-form-field-to no-label-float" label="To:"></paper-input>
        <paper-input className="post-form-field-title no-label-float" label="Post Title"></paper-input>
        <textarea
            id="post-editor"
            className="post-form-field-body"></textarea>
        <div className="post-form-buttons layout horizontal end-justified">
          <paper-button class="post-form-cancel">Cancel</paper-button>
          <paper-button raised class="post-form-submit">Post</paper-button>
        </div>
      </form>
    );
  }
});
