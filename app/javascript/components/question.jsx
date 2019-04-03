import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="col">
          <div className="card bg-light mb-3">
            <div className="card-body">
              <h2>{this.props.question} </h2>
              <div className="m-4 d-flex flex-row">
                {this.props.answers.map(answer => (
                  <div className="col">
                    <button type="button" className="btn btn-primary">
                      {answer.value}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  id: PropTypes.id,
  question: PropTypes.string,
  answers: PropTypes.array,
  authenticityToken: PropTypes.string
};
