import React from 'react';

// App component - represents the whole app
class App extends React.Component {
  render() {
    return (
      this.props.children
    );
  }
};

export default App;
