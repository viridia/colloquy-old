import React from 'react';

// Form for editing a post
PostForm = React.createClass({
  mixins: [PolymerEventListener],

  componentDidMount() {
    // Set up the WYSIWYG editor.
    tinymce.init({
      selector: '.post-editor',
      elementpath: false,
      menubar: false,
      statusbar: false,
      resize: false,
      plugins: 'link image codesample imagetools',
      // Note: codesample doesn't work that well, possibly remove. I'd like
      // to be able to apply the style to existing text.
      toolbar: 'undo redo | formatselect | ' +
               'bold italic underline strikethrough blockquote codesample removeformat | ' +
               'bullist numlist | ' +
               'link image',
      body_class: 'post-editor-body',
      content_style: '.post-editor-body {font-size: 16px}',
      height: 300,
    });

    this.recipients.remoteUrl = '/api/recipients?q=%QUERY';
    this.updateFields();

    // TODO: Add api key (need to publish this).
    // TODO: Set initial focus and cursor position.
  },

  componentDidUpdate() {
    this.updateFields();
  },

  // Populate editor fields with post.
  updateFields() {
    if (this.props.post) {
      tinymce.activeEditor.setContent(this.props.post.body);
      // Don't allow the recipients to be changed once a post has been published.
      // if (this.props.post.status != Status.DRAFT) {
      //   this.recipients.setAttribute('disabled', '');
      // }
      // this.recipients.splice(
      //     'selectedObjects', 0, this.recipients.selectedObjects.length, this.props.recipients);
    } else {
      // Clear the list of recipients for new post.
      // if (this.recipients.selectedObjects) {
      //   this.recipients.splice('selectedObjects', 0, this.recipients.selectedObjects.length);
      // }
      this.recipients.removeAttribute('disabled');
    }
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
      const [rtype, rkey] = r.tag.split(':');
      if (rtype == 'user') {
        recipientUsers.push(rkey);
      } else if (rtype == 'channel') {
        recipientChannels.push(rkey);
      } else {
        throw new Error('Invalid recipient type: ' + rtype);
      }
    });

    const post = {
      recipientUsers: recipientUsers,
      recipientChannels: recipientChannels,
      title: this.titleField.value,
      body: tinymce.activeEditor.getContent({format : 'raw'})
    };

    // Select whether we are creating a new post or editing an existing one.
    var method = 'post';
    if (this.props.post) {
      post._id = this.props.post._id;
      method = 'editPost';
    }

    // Ask the server to store this post.
    Meteor.call(method, post, publish, (error, result) => {
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
    var msg = '';
    // TODO: Temporarily disable this check for editing existing posts because we're having
    // trouble pre-populating the recipients widget.
    if (this.recipients.selectedObjects.length == 0 && !this.props.post) {
      msg = 'Please enter at least once recipient.';
    } else if (!this.titleField.value) {
      msg = 'Please enter a title for this post.';
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
      <form className='post-form layout vertical fit'>
        <paper-input-autocomplete-chips
            class='post-form-field-recipients'
            label='To:'
            max-suggestions='5'
            placeholder='Recipients'
            allow-select-unknown-token='true'
            ref={(el) => this.recipients = el}></paper-input-autocomplete-chips>
        <paper-input
            class='post-form-field-title no-label-float'
            label='Post Title'
            value={this.props.post && this.props.post.title}
            ref={(el) => this.titleField = el}></paper-input>
        <textarea
            className='post-editor post-form-field-body'></textarea>
        <div className='post-form-buttons layout horizontal end-justified'>
          <paper-button
              class='post-form-cancel'
              on-tap='handleCancel'>Cancel</paper-button>
          {this.props.post && this.props.post.status == Status.PUBLISHED ? '' :
            (<paper-button raised
                class='post-form-submit'
                on-tap='handleSave'>Save Draft</paper-button>)}
          <paper-button raised
              class='post-form-submit'
              on-tap='handlePost'>Post</paper-button>
        </div>
        <ErrorDialog ref={(el) => this.errorDialog = el} />
      </form>
    );
  }
});
