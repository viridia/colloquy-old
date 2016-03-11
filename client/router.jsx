import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, NotFoundRoute, browserHistory } from "react-router";
import App from './App.jsx';
import PostEditPage from './pages/PostEditPage.jsx';
import PostListPage from './pages/PostListPage.jsx';
import SinglePostPage from './pages/SinglePostPage.jsx';

// A history object must be created to maintain the history for our router
const history = browserHistory;
// TODO: Remove evil global. Unfortunately, Router doesn't give us any way
// to pass the history into the App object so that it can set it as a context.
window.HISTORY = history;

// Redirects to the main page if the user is not logged in.
function requireAuth(nextState, replace) {
  if (!Meteor.userId()) {
    replace({ nextPathname: nextState.location.pathname }, '/');
  }
}

// Routing table. Note that there are additional routes in the server/api
// folder that use HTTP.methods for RESTful APIs. Those routes all begin with
// "/api/" so it should be easy to avoid conflicts.
Routes = (
  <Router history={history}>
    <Route name="root" component={App} path="/">
      <Route component={PostEditPage} path="/post" onEnter={requireAuth} />
      <Route component={PostEditPage} path="/post/:postId" onEnter={requireAuth} />
      <Route component={SinglePostPage} path="/single/:postId" />
      <IndexRoute component={PostListPage} />
    </Route>
  </Router>);

// Render the top-level component as chosen by the router.
Meteor.startup(function () {
  ReactDOM.render(Routes, document.getElementById("render-target"));
});
