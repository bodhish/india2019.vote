import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "../components/home";
import PredictionsFeed from "../components/predictionsFeed";

document.addEventListener("turbolinks:load", () => {
  const root = document.getElementById("app-root");
  if (root !== null) {
    const props = JSON.parse(root.dataset.props);
    ReactDOM.render(React.createElement(Home, props), root);
  }
});

document.addEventListener("turbolinks:load", () => {
  const feedRoot = document.getElementById("app-feed");
  if (feedRoot !== null) {
    const props = JSON.parse(feedRoot.dataset.props);
    ReactDOM.render(React.createElement(PredictionsFeed, props), feedRoot);
  }
});
