const OBJECT_KEY = '__PEL__';

// A mixin class which listens for polymer events and dispatches them to the handler specified
// on the on-<event name> attribute.
PolymerEventListener = {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    el[OBJECT_KEY] = { root: true };
    // Wait until children are mounted.
    // TODO: Does this work?
    Meteor.setTimeout(() => {
      this.updateListeners();
    }, 0);
  },

  componentDidUpdate() {
    this.updateListeners();
  },

  componentWillUnmount() {
    // TODO: Remove listeners. To do this, we'll want to keep track of the nodes that we
    // added listeners to.
    // I'm not sure we actually need to do this, the listeners should go away when the nodes
    // are deleted.
  },

  updateListeners() {
    const root = ReactDOM.findDOMNode(this)
    this.listenFor(root, 'tap');
  },

  // Set up listeners.
  listenFor(root, eventType) {
    const attrName = 'on-' + eventType;
    const nodes = root.querySelectorAll(['[' + attrName + ']']);
    for (node of nodes) {
      if (!this.isInComponentScope(root, node)) {
        continue;
      }
      if (!node[OBJECT_KEY]) {
        node[OBJECT_KEY] = {};
      }
      const handler = node.getAttribute(attrName);
      const nodeData = node[OBJECT_KEY] || {};
      if (nodeData[eventType] != handler) {
        node.addEventListener(eventType, this[handler]);
        nodeData[eventType] = handler;
      }
    }
  },

  // Return true if child element belongs to this component and not a different component nested
  // within it.
  isInComponentScope(root, child) {
    while (child) {
      if (child == root) {
        return true;
      }
      if (child[OBJECT_KEY] && child[OBJECT_KEY].root) {
        return false;
      }
      child = child.parentNode;
    }
    return false;
  }
};
