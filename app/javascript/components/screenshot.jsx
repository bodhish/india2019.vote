import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as HtmlToImage from "html-to-image";
import * as Download from "downloadjs";
export default class Screenshot extends React.Component {
  constructor(props) {
    super(props);
    this.takeAScreenshot = this.takeAScreenshot.bind(this);
  }
  takeAScreenshot(e) {
    e.preventDefault();
    const profile = document.getElementById(this.props.elementID);
    HtmlToImage.toPng(profile)
      .then(function(dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        Download(dataUrl, this.props.elementID);
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  }

  render() {
    return (
      <div className="p-4 text-center">
        <button onClick={this.takeAScreenshot}>Download Screenshot </button>
      </div>
    );
  }
}

Screenshot.propTypes = {
  elementID: PropTypes.string.isRequired
};
