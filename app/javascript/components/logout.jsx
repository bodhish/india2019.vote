import React from "react";
import PropTypes from "prop-types";
export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="button">
        <form className="button_to" method="post" action="/users/sign_out">
          <input name="_method" value="delete" type="hidden" />
          <input
            name="authenticity_token"
            type="hidden"
            value={this.props.authenticityToken}
          />
          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-white hover:bg-grey text-blue  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Submit"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Logout.propTypes = {
  authenticityToken: PropTypes.string
};
