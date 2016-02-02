const {
  Router,
  Route,
  IndexRoute,
  Link,
  NotFoundRoute,
} = ReactRouter;

// A history object must be created to maintain the history for our router
const history = ReactRouter.history.createHistory();

// Routing table
Routes = (
  <Router history={history}>
    <Route name="root" component={App} path="/">
      <Route component={PostEditPage} path="/post" />
      <IndexRoute component={PostListPage} />
    </Route>
  </Router>);

Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  ReactDOM.render(Routes, document.getElementById("render-target"));
});
