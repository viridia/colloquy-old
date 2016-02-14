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
               "bold italic underline strikethrough blockquote codesample removeformat | " +
               "bullist numlist | " +
               "link image",
      body_class: "post-editor-body",
      content_style: ".post-editor-body {font-size: 16px}",
      height: 300,
    });

    // Subscribe to polymer events.
    this.postButton.addEventListener("tap", this.handlePost);
    this.saveButton.addEventListener("tap", this.handleSave);
    this.cancelButton.addEventListener("tap", this.handleCancel);

    // Mark post button as initialy disabled.
    //this.postButton.setAttribute("disabled", "");

    // Suggestion data for recipients field (temporary until we get remote suggestions working)
    // TODO: Add api key (need to publish this).
    this.recipients.remoteUrl = "/api/recipients?q=%QUERY";
  },

  // Handle clicking on the 'Post' button.
  handlePost(e) {
    this.submitPost(true);
  },

  // Handle clicking on the 'Save Draft' button.
  handleSave(e) {
    this.submitPost(false);
  },

  // Handle clicking on the 'Cancel' button.
  handleCancel(e) {
    // TODO: Remove evil global.
    window.HISTORY.goBack();
  },

  // Submit the post to the server.
  // @param publish If true, the post should be published to the recipients,
  //     else it should only be saved as a draft. Has no effect if the post
  //     has already been published.
  submitPost(publish:bool) {
    if (!this.ensureValidPost()) {
      return;
    }
    // Process selected recipient objects into lists of recipient ids.
    const recipientUsers = [];
    const recipientChannels = [];
    this.recipients.selectedObjects.forEach((r) => {
      const [rtype, rkey] = r.tag.split(":");
      if (rtype == "user") {
        recipientUsers.push(rkey);
      } else if (rtype == "channel") {
        recipientChannels.push(rkey);
      } else {
        throw new Error("Invalid recipient type: " + rtype);
      }
    });

    // TODO: Add post id if editing an existing post.
    const post = {
      recipientUsers: recipientUsers,
      recipientChannels: recipientChannels,
      title: this.titleField.value,
      body: tinymce.activeEditor.getContent({format : 'raw'})
    };

    Meteor.call("post", post, publish, (error, result) => {
      if (error) {
        this.errorDialog.show(error.error);
      } else {
        // Navigate to previous page.
        window.HISTORY.goBack();
      }
    });
  },

  // Check to make sure they have filled out the required fields.
  ensureValidPost() {
    var msg = "";
    if (this.recipients.selectedObjects.length == 0) {
      msg = "Please enter at least once recipient.";
    } else if (!this.titleField.value) {
      msg = "Please enter a title for this post.";
    }

    if (msg) {
      this.errorDialog.show(msg);
      return false;
    } else {
      return true;
    }
  },

  render() {
    return (
      <form className="post-form layout vertical fit">
        <paper-input-autocomplete-chips
            class="post-form-field-recipients"
            label="To:"
            max-suggestions="5"
            placeholder="Recipients"
            allow-select-unknown-token="true"
            ref={(el) => this.recipients = el}></paper-input-autocomplete-chips>
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
              ref={(el) => this.saveButton = el}>Save Draft</paper-button>
          <paper-button raised
              class="post-form-submit"
              ref={(el) => this.postButton = el}>Post</paper-button>
        </div>
        <ErrorDialog ref={(el) => this.errorDialog = el} />
      </form>
    );
  }
});
