// Page showing a list of post summaries
PostListPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    return {
      states: [
        {
          key: 1,
          text: "Alabama",
          tag: 'read-only',
          readOnly: false
        },
        {
          key: 2,
          text: "Alaska",
          imgUrl: 'http://lorempixel.com/256/256/'
        },
        {
          key: 3,
          text: "American Samoa",
          imgUrl: 'http://lorempixel.com/200/200/sports/1/'
        },
        {
          key: 4,
          text: "Arizona",
          imgUrl: 'http://lorempixel.com/256/256/'
        },
        {
          key: 5,
          text: "Arkansas",
          imgUrl: null
        },
        {
          key: 6,
          text: "California",
          imgUrl: 'http://lorempixel.com/256/256/'
        },
        {
          key: 7,
          text: "Colorado",
          imgUrl: null
        }
      ]      
    }
  },

  handleClick: function() {
    // Explicitly focus the text input using the raw DOM API.
    if (this.autoCompleteInput !== null) {
      console.debug('sutocomplete selected objects: ', this.autoCompleteInput.selectedObjects);
    }
  },
  
  render() {
    return (
      <paper-header-panel className="flex">
        <AppBar />
        <div className="post-list">
          <PostListControls />
          <Post />
          <paper-card className="block">
            <div className="card-content">
              <h1>Todo List</h1>
              <paper-button raised onClick={this.handleClick}>Button</paper-button>
              <paper-input-autocomplete-chips label="US states" max-suggestions="3" placeholder="US states" suggestions-position="top" ref={(input) => {
                if (input != null) {
                  this.autoCompleteInput = input;
                  input.localCandidates = this.data.states;
                }
              }}></paper-input-autocomplete-chips>
            </div>
          </paper-card>
        </div>
      </paper-header-panel>
    );
  }
});
