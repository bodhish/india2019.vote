import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="founder-dashboard-container pb-5">
        <h1>{this.props.userName}</h1>
        <img src={this.props.userImage} alt="new" />
      </div>
    );
  }
}

Home.propTypes = {
  userName: PropTypes.string,
  userImage: PropTypes.string
};
