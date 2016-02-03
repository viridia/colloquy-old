const {
  Router,
  Route,
  IndexRoute,
  NotFoundRoute,
} = ReactRouter;

// A history object must be created to maintain the history for our router
const history = ReactRouter.history.createHistory();

// Redirects to the main page if the user is not logged in.
function requireAuth(nextState, replace) {
  if (!Meteor.userId()) {
    replace({ nextPathname: nextState.location.pathname }, '/');
  }
}

// Routing table
Routes = (
  <Router history={history}>
    <Route name="root" component={App} path="/">
      <Route component={PostEditPage} path="/post" onEnter={requireAuth} />
      <IndexRoute component={PostListPage} />
    </Route>
  </Router>);

// Render the top-level component as chosen by the router.
Meteor.startup(function () {
  ReactDOM.render(Routes, document.getElementById("render-target"));
});
