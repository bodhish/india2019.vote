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
    let answer3 = value.length < 1 ? 0 : Math.abs(parseInt(value));
    if (answer3 > 543) {
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
      return this.state.answer1.length > 2 ? true : false;
    } else if (this.state.questionNumber == 2) {
      return this.state.answer2.length > 2 ? true : false;
    } else if (this.state.questionNumber == 3) {
      return true;
    } else {
      return false;
    }
  }

  updateAnswer4(e) {
    let value = e.target.value;
    let answer4 = value.length < 1 ? 0 : Math.abs(parseInt(value));
    if (answer4 > 543) {
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
    let invalidSeatCount = !(
      this.state.answer3 + this.state.answer4 + this.state.othersCount ===
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
  }

  selectedAnswerClasses(bool) {
    let classes =
      "rounded-lg bg-white answer-option__card w-28 h-28 p-4 flex items-center justify-center";
    return bool ? classes + " answer-option__card--active" : classes;
  }
  render() {
    return (
      <div className="mb-6">
        <div className="flex flex-col relative px-16 py-12 mb-4 flex items-center">
          <div className="absolute pin-r pin-t">
            <button
              onClick={this.props.toggleShowFormCB}
              className="p-4 text-black"
            >
              Close
            </button>
          </div>
          {this.props.coinsLeft > 299 && (
            <form action="/predictions" method="post">
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
                value={this.state.answer3}
              />
              <input
                type="hidden"
                name="prediction[answer_4]"
                value={this.state.answer4}
              />

              {this.state.questionNumber == 1 && (
                <div className="w-full question-card rounded-lg shadow-lg px-16 py-12 mb-4 flex items-center">
                  <div className="w-full">
                    <p className="text-primary-light text-sm">QUESTION 1</p>
                    <label
                      className="block text-lg question-card__question text-white mt-3"
                      htmlFor="grid-state"
                    >
                      Who will form the government in 2019?
                    </label>
                    <div className="relative w-full flex flex-wrap mt-4">
                      <div className="p-2">
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
                      <div className="p-2">
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
                      <div className="p-2">
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
                <div className="w-full question-card rounded-lg shadow-lg px-16 py-12 mb-4 flex items-center">
                  <div className="w-full">
                    <p className="text-primary-light text-sm">QUESTION 2</p>
                    <label
                      className="block text-lg question-card__question text-white mt-3"
                      htmlFor="grid-state"
                    >
                      Who will be the prime minister?
                    </label>
                    <div className="relative w-full flex flex-wrap mt-6">
                      <div className="p-2">
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
                      <div className="p-2">
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
                      <div className="p-2">
                        <div
                          onClick={() => this.updateAnswer2("Mamata Banerjee")}
                          value="Mamata Banerjee"
                          className={this.selectedAnswerClasses(
                            this.state.answer2 == "Mamata Banerjee"
                          )}
                        >
                          Mamata Banerjee
                        </div>
                      </div>
                      <div className="p-2">
                        <div
                          onClick={() => this.updateAnswer2("Arvind Kejriwal")}
                          value="Arvind Kejriwal"
                          className={this.selectedAnswerClasses(
                            this.state.answer2 == "Arvind Kejriwal"
                          )}
                        >
                          Arvind Kejriwal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {this.state.questionNumber == 3 && (
                <div className="w-full flex flex-col  question-card rounded-lg shadow-lg px-16 py-12 mb-4 flex items-center">
                  <div className="w-full">
                    <p className="text-primary-light text-sm">QUESTION 3</p>
                    <div className="mb-2">
                      <div className="block question-card__question text-white mt-3">
                        How will the seats be shared?
                      </div>
                      <div className="flex flex-col sm:flex-row mt-3 justify-center px-2">
                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase text-center text-white mb-2"
                            htmlFor="bjp"
                          >
                            BJP
                          </label>
                          <input
                            className="text-center flex justify-center items-center bg-grey-lighter w-full h-20 text-xl border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="bjp"
                            type="number"
                            placeholder="182"
                            value={this.state.answer3}
                            onChange={this.updateAnswer3}
                          />
                        </div>

                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase text-center text-white mb-2"
                            htmlFor="congress"
                          >
                            Congress
                          </label>
                          <input
                            className="appearance-none flex justify-center items-center text-center w-full bg-grey-lighter h-20 text-xl  border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="congress"
                            type="number"
                            placeholder="182"
                            value={this.state.answer4}
                            onChange={this.updateAnswer4}
                          />
                        </div>

                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase text-center text-white mb-2"
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
                <div className="w-full flex flex-col question-card rounded-lg shadow-lg px-16 py-12 mb-4 flex items-center">
                  <div className="w-full">
                    <p className="text-primary-light text-sm">QUESTION 4</p>
                    <div className="mb-2">
                      <div className="block question-card__question text-white mt-3">
                        Coins To Bet
                      </div>
                    </div>
                    <div className="w-full mb-2">
                      <div className="relative w-full">
                        <input
                          className="appearance-none text-center block w-full bg-grey-lighter border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
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
                    </div>
                    <div className="mb-2">
                      <div className="block text-white text-xs">
                        Coins Left {this.props.coinsLeft}
                      </div>
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

          {this.nextDisabled() && (
            <div className="flex justify-between pt-2">
              <button
                onClick={this.updateQuestionNumber}
                className="btn bg-white hover:bg-grey text-blue focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
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
