import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Question from "./question";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      userImage: props.userImage,
      questions: props.questions
    };
  }
  render() {
    return (
      <div className="container bg-black">
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
            {this.state.questions.map(question => (
              <Question question={question.value} answers={question.answers} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  userName: PropTypes.string,
  userImage: PropTypes.string,
  questions: PropTypes.array
};
