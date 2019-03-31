import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-8">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <div className="mr-3 rounded float-left d-block img-thumbnail">
                  <img src={this.props.userImage} alt="photo" />
                </div>
                <h3>{this.props.userName}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="card bg-light mb-3">
              <div className="card-header">Questions</div>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <h2>Who's the PM? </h2>
                <div className="m-4 d-flex flex-row">
                  <div className="col-6">
                    <button type="button" class="btn btn-primary">
                      Narendra Modi
                    </button>
                  </div>
                  <div className="col-6">
                    <button type="button" class="btn btn-primary">
                      Rahul Gandhi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  userName: PropTypes.string,
  userImage: PropTypes.string
};
