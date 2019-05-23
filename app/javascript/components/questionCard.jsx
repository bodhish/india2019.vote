import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
export default class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer1: "",
      answer2: "",
      answer3: 0,
      answer4: 0,
      questionNumber: 1,
      othersCount: 543,
      coins: 300
    };
    this.updateAnswer3 = this.updateAnswer3.bind(this);
    this.updateAnswer4 = this.updateAnswer4.bind(this);
    this.saveDisabled = this.saveDisabled.bind(this);
    this.updateCoins = this.updateCoins.bind(this);
    this.updateAnswer1 = this.updateAnswer1.bind(this);
    this.updateAnswer2 = this.updateAnswer2.bind(this);
    this.selectedAnswerClasses = this.selectedAnswerClasses.bind(this);
    this.updateQuestionNumber = this.updateQuestionNumber.bind(this);
    this.nextDisabled = this.nextDisabled.bind(this);
  }
  updateQuestionNumber(e) {
    this.setState({
      questionNumber: this.state.questionNumber + 1
    });
  }

  updateAnswer3(e) {
    let value = e.target.value;
    let answer3 = value.length === 0 ? 0 : Math.abs(parseInt(value));
    if (value.length === 0) {
      this.setState({ answer3: value });
    } else if (answer3 > 543) {
      this.setState({
        answer3: 543,
        answer4: 0,
        othersCount: 0
      });
    } else if (answer3 + this.state.answer4 > 543) {
      let answer4 = 543 - answer3;
      this.setState({
        answer3: answer3,
        answer4: answer4,
        othersCount: 0
      });
    } else {
      let othersCount = 543 - answer3 - this.state.answer4;
      this.setState({
        answer3: answer3,
        othersCount: othersCount
      });
    }
  }

  nextDisabled() {
    if (this.state.questionNumber == 1) {
      return this.state.answer1.length > 2;
    } else if (this.state.questionNumber == 2) {
      return this.state.answer2.length > 2;
    } else if (this.state.questionNumber == 3) {
      return true;
    } else {
      return false;
    }
  }

  updateAnswer4(e) {
    let value = e.target.value;
    let answer4 = value.length === 0 ? 0 : Math.abs(parseInt(value));
    if (value.length === 0) {
      this.setState({ answer4: value });
    } else if (answer4 > 543) {
      this.setState({
        answer3: 0,
        answer4: 543,
        othersCount: 0
      });
    } else if (this.state.answer3 + answer4 > 543) {
      let answer3 = 543 - answer4;
      this.setState({
        answer3: answer3,
        answer4: answer4,
        othersCount: 0
      });
    } else {
      let othersCount = 543 - answer4 - this.state.answer3;
      this.setState({
        answer4: answer4,
        othersCount: othersCount
      });
    }
  }

  updateCoins(e) {
    let value = e.target.value;
    let inputCoins = value.length < 1 ? value : Math.abs(parseInt(value));

    if (value.length < 3) {
      this.setState({
        coins: inputCoins
      });
    } else if (inputCoins < 299) {
      this.setState({
        coins: 300
      });
    } else if (inputCoins > this.props.coinsLeft) {
      this.setState({
        coins: this.props.coinsLeft
      });
    } else {
      this.setState({
        coins: inputCoins
      });
    }
  }

  updateAnswer2(e) {
    this.setState({
      answer2: e
    });
  }

  updateAnswer1(e) {
    this.setState({
      answer1: e
    });
  }

  saveDisabled() {
    let answer3 = this.state.answer3 === "" ? 0 : this.state.answer3;
    let answer4 = this.state.answer4 === "" ? 0 : this.state.answer4;
    let invalidSeatCount = !(
      answer3 + answer4 + this.state.othersCount ===
      543
    );
    let coinsGreaterThanMin = this.state.coins > 299;
    let coinsLessThanMax = this.state.coins <= this.props.coinsLeft;
    let InValidAnswer1 = this.state.answer1.length < 2;
    let InValidAnswer2 = this.state.answer2.length < 2;
    return (
      InValidAnswer1 ||
      InValidAnswer2 ||
      invalidSeatCount ||
      !coinsGreaterThanMin ||
      !coinsLessThanMax
    );
    true;
  }

  selectedAnswerClasses(bool) {
    let classes =
      "rounded-lg bg-white answer-option__card w-22 h-22 md:w-28 md:h-28 p-4 flex items-center justify-center";
    return bool ? classes + " answer-option__card--active" : classes;
  }
  render() {
    let helpText = {
      1: "Remember, the goal is to accurately predict what’s going to happen, not to showcase support for your favourite party. You can choose to keep your prediction private later in the menu.",
      2: "Remember, the goal is to accurately predict what’s going to happen, not to showcase support for your favourite candidate. You can choose to keep your prediction private later in the menu.",
      3: "You can make a total of 3 predictions by spending your 1000 coins wisely. You need a minimum of 300 coins to make a prediction.",
      4: "The closest correct result with the highest number of coins allotted to it will be the winner. Ties will be resolved by a lucky draw. Good luck!"
    };
    return (
      <div className="h-screen mb-6">
        <div className="flex flex-col relative px-4 md:px-16 py-12 mb-4 flex items-center">
          <div className="md:fixed absolute pin-t pin-r question-card__close md:mr-2 md:mt-2 hover:bg-grey-lighter rounded-lg">
            <button
              onClick={this.props.toggleShowFormCB}
              className="p-2 flex flex-col items-center focus:outline-none"
            >
              <img className="w-8 h-8 rounded-full" src={"assets/close.svg"} />
              <span className="text-xs hidden md:block pt-1 text-grey-darker">
                Close
              </span>
            </button>
          </div>
          {this.props.coinsLeft > 299 && (
            <form className="w-full" action="/predictions" method="post">
              <input
                type="hidden"
                name="authenticity_token"
                value={this.props.authenticityToken}
              />

              <input
                type="hidden"
                name="prediction[answer_1]"
                value={this.state.answer1}
              />
              <input
                type="hidden"
                name="prediction[answer_2]"
                value={this.state.answer2}
              />
              <input
                type="hidden"
                name="prediction[answer_3]"
                value={this.state.answer3 === "" ? 0 : this.state.answer3}
              />
              <input
                type="hidden"
                name="prediction[answer_4]"
                value={this.state.answer4 === "" ? 0 : this.state.answer4}
              />

              {this.state.questionNumber == 1 && (
                <div className="w-full question-card rounded-lg shadow-lg px-4 md:px-16 py-12 mb-4 flex items-center mx-auto">
                  <div className="w-full">
                    <p className="text-primary-light text-sm">QUESTION 1</p>
                    <label
                      className="block text-lg leading-tight question-card__question text-white mt-3"
                      htmlFor="grid-state"
                    >
                      Who will form the government in 2019?
                    </label>
                    <div className="relative w-full flex flex-wrap mt-4">
                      <div className="p-1 md:p-2">
                        <div
                          value="UPA"
                          onClick={() => this.updateAnswer1("UPA")}
                          className={this.selectedAnswerClasses(
                            this.state.answer1 == "UPA"
                          )}
                        >
                          UPA
                        </div>
                      </div>
                      <div className="p-1 md:p-2">
                        <div
                          onClick={() => this.updateAnswer1("NDA")}
                          value="NDA"
                          className={this.selectedAnswerClasses(
                            this.state.answer1 == "NDA"
                          )}
                        >
                          NDA
                        </div>
                      </div>
                      <div className="p-1 md:p-2">
                        <div
                          onClick={() => this.updateAnswer1("OTHER")}
                          value="OTHER"
                          className={this.selectedAnswerClasses(
                            this.state.answer1 == "OTHER"
                          )}
                        >
                          OTHER
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {this.state.questionNumber == 2 && (
                <div className="w-full question-card rounded-lg shadow-lg px-4 md:px-16 py-12 mb-4 flex items-center mx-auto">
                  <div className="w-full">
                    <p className="text-primary-light text-sm">QUESTION 2</p>
                    <label
                      className="block text-lg leading-tight question-card__question text-white mt-3"
                      htmlFor="grid-state"
                    >
                      Who will be the prime minister?
                    </label>
                    <div className="relative w-full flex flex-wrap mt-6">
                      <div className="p-1 md:p-2">
                        <div
                          onClick={() => this.updateAnswer2("Narendra Modi")}
                          value="Narendra Modi"
                          className={this.selectedAnswerClasses(
                            this.state.answer2 == "Narendra Modi"
                          )}
                        >
                          Narendra Modi
                        </div>
                      </div>
                      <div className="p-1 md:p-2">
                        <div
                          onClick={() => this.updateAnswer2("Rahul Gandhi")}
                          value="Rahul Gandhi"
                          className={this.selectedAnswerClasses(
                            this.state.answer2 == "Rahul Gandhi"
                          )}
                        >
                          Rahul Gandhi
                        </div>
                      </div>
                      <div className="p-1 md:p-2">
                        <div
                          onClick={() => this.updateAnswer2("Other")}
                          value="Other"
                          className={this.selectedAnswerClasses(
                            this.state.answer2 == "Other"
                          )}
                        >
                          Other
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {this.state.questionNumber == 3 && (
                <div className="w-full flex flex-col  question-card rounded-lg shadow-lg px-4 md:px-16 py-12 mb-4 flex items-center mx-auto">
                  <div className="w-full">
                    <p className="text-primary-light text-sm">QUESTION 3</p>
                    <div className="mb-2">
                      <div className="block question-card__question text-white mt-3">
                        How will the seats be shared?
                      </div>
                      <div className="flex sm:flex-row flex-wrap mt-3 justify-center">
                        <div className="md:w-1/3 w-1/2 px-1 md:px-2 mb-3 md:mb-0">
                          <label
                            className="block uppercase md:text-center text-left text-white mb-1"
                            htmlFor="bjp"
                          >
                            NDA
                          </label>
                          <input
                            className="text-center flex justify-center items-center bg-grey-lighter w-full h-20 text-xl border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="bjp"
                            type="number"
                            placeholder="0"
                            value={this.state.answer3}
                            onChange={this.updateAnswer3}
                          />
                        </div>

                        <div className="md:w-1/3 w-1/2 px-1 md:px-2 mb-3 md:mb-0">
                          <label
                            className="block uppercase md:text-center text-left text-white mb-1"
                            htmlFor="congress"
                          >
                            UPA
                          </label>
                          <input
                            className="appearance-none flex justify-center items-center text-center w-full bg-grey-lighter h-20 text-xl  border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="congress"
                            type="number"
                            placeholder="0"
                            value={this.state.answer4}
                            onChange={this.updateAnswer4}
                          />
                        </div>

                        <div className="md:w-1/3 w-full px-1 md:px-2 mb-3 md:mb-0 pt-1 md:pt-0">
                          <label
                            className="block uppercase md:text-center text-left text-white mb-1"
                            htmlFor="others"
                          >
                            Others
                          </label>
                          <p
                            className="opacity-50 appearance-none text-center flex justify-center items-center w-full bg-grey-lighter h-20 text-xl border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="others"
                          >
                            {this.state.othersCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {this.state.questionNumber == 4 && (
                <div className="w-full flex flex-col question-card rounded-lg shadow-lg px-4 md:px-16 py-12 mb-4 flex items-center mx-auto">
                  <div className="w-full">
                    <p className="text-primary-light text-sm">QUESTION 4</p>
                    <div className="mb-2">
                      <div className="block question-card__question text-white mt-3">
                        Coins To Bet
                      </div>
                    </div>
                    <div className="flex w-full mb-2 justify-center items-center">
                      <div className="relative flex-1 mr-5">
                        <input
                          className="appearance-none text-center block w-full h-20 text-xl bg-grey-lighter border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                          id="others"
                          type="number"
                          placeholder="300"
                          min="300"
                          max={this.props.coinsLeft}
                          value={this.state.coins}
                          onChange={this.updateCoins}
                          name="prediction[coins_used]"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="coin-bg flex shadow-lg justify-center items-center mx-auto">
                          <span class="text-xl font-bold coin-currency text-center">
                            {this.props.coinsLeft}
                          </span>
                        </div>
                        <span className="block mt-1 text-white text-sm">
                          Coins left
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        id="prediction[private]"
                        className="text-white text-sm md:flex md:items-center"
                      >
                        <input type="checkbox" name="prediction[private]" />
                        &nbsp;Check this box to keep this prediction private
                      </label>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <button
                        className="btn hover:bg-grey text-blue py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        value="Submit"
                        disabled={this.saveDisabled()}
                      >
                        Submit Your Prediction
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}

          <div className="w-full m-2 sm:w-2/5 text-sm">
            {" "}
            {helpText[this.state.questionNumber]}
          </div>
          {this.nextDisabled() && (
            <div className="w-full md:w-2/3 bg-white fixed pin-b z-20 footer-button-container">
              <div className="p-2 w-full flex flex-row justify-center items-center border-t">
                <button
                  onClick={this.updateQuestionNumber}
                  className="btn bg-white next-btn text-sm w-48 hover:bg-grey flex items-center justify-center text-blue focus:outline-none focus:shadow-outline"
                >
                  Next
                  <img
                    className="w-3 next-btn-icon ml-3"
                    src={"assets/arrow-right.svg"}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  authenticityToken: PropTypes.string,
  coinsLeft: PropTypes.number,
  toggleShowFormCB: PropTypes.func
};
