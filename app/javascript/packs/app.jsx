import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "../components/home";

$(document).on("turbolinks:load", () => {
  const root = document.getElementById("app-root");
  const props = $(root).data("props");
  ReactDOM.render(React.createElement(Home, props), root);
});