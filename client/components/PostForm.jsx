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
               "bullist numlist | link image",
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
    this.recipients.localCandidates = this.getSuggestions().states;
  },

  getSuggestions () {
    return {
      states: [
        {
          key: 1,
          text: "Alabama",
          tag: "read-only",
          readOnly: false
        },
        {
          key: 2,
          text: "Alaska",
          imgUrl: "http://lorempixel.com/256/256/"
        },
        {
          key: 3,
          text: "American Samoa",
          imgUrl: "http://lorempixel.com/200/200/sports/1/"
        },
        {
          key: 4,
          text: "Arizona",
          imgUrl: "http://lorempixel.com/256/256/"
        },
        {
          key: 5,
          text: "Arkansas",
          imgUrl: null
        },
        {
          key: 6,
          text: "California",
          imgUrl: "http://lorempixel.com/256/256/"
        },
        {
          key: 7,
          text: "Colorado",
          imgUrl: null
        }
      ]
    }
  },

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

  handlePost(e) {
    // Handle clicking on the 'Post' button.
    console.log("Post", e);
    if (this.ensureValidPost()) {
      //    window.location = "/";
    }
  },

  handleSave(e) {
    // Handle clicking on the 'Post' button.
    console.log("Post", e);
    this.errorDialog.open();
//    window.location = "/";
  },

  // Handle clicking on the 'Cancel' button.
  handleCancel(e) {
    // TODO: Remove evil global.
    window.HISTORY.push("/");
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
