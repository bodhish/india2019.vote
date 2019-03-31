import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "../components/home";

$(document).on("turbolinks:load", () => {
  const root = document.getElementById("app-root");
  const props = $(root).data("props");
  ReactDOM.render(React.createElement(Home, props), root);
});

// import React from "react";
// import ReactDOM from "react-dom";
// import PropTypes from "prop-types";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       userName: props.string,
//       userImage: props.string
//     };
//   }
//   // setRootState(updater, callback) {
//   //   // newState can be object or function!
//   //   this.setState(updater, () => {
//   //     if (this.props.debug) {
//   //       console.log("setRootState", JSON.stringify(this.state));
//   //     }

//   //     if (callback) {
//   //       callback();
//   //     }
//   //   });
//   // }
//   render() {
//     return (
//       <div className="founder-dashboard-container pb-5">
//         <h1>"Bodhish"</h1>
//       </div>
//     );
//   }
// }

// App.propTypes = {
//   userName: PropTypes.string,
//   userImage: PropTypes.string
// };
