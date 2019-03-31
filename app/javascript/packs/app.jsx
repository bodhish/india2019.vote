import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "../components/home";

document.addEventListener("turbolinks:load", () => {
  const root = document.getElementById("app-root");
  const props = JSON.parse(root.dataset.props);
  ReactDOM.render(React.createElement(Home, props), root);
});
