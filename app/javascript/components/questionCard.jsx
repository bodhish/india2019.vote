import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="w-full">
        <form className="px-8 pt-6 pb-8 mb-4" action="/predictions" method="post">
          <input type="hidden" name="authenticity_token" value={this.props.authenticityToken}></input>
          <div className="w-full mb-6">
            <label
              className="block tracking-wide text-lg mb-2"
              htmlFor="grid-state"
            >
              Who will form the government in 2019?
            </label>
            <div className="relative w-full md:w-1/3 mx-auto">
              <select
                className="block w-full appearance-none bg-grey-lighter border border-grey-lighter py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="grid-state" name="prediction[answer_1]"
              >
                <option value="" disabled selected>
                  Select...
                </option>
                <option>BJP</option>
                <option>Congress</option>
                <option>NDA</option>
                <option>UPA</option>
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full mb-6">
            <label
              className="block tracking-wide text-lg mb-2"
              htmlFor="grid-state"
            >
              Who will be the prime minister?
            </label>
            <div className="relative w-full md:w-1/3 mx-auto">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="grid-state" name="prediction[answer_2]"
              >
                <option value="" disabled selected>
                  Select...
                </option>
                <option>Narendra Modi</option>
                <option>Rahul Gandhi</option>
                <option>Mamata Banerjee</option>
                <option>Arvind Kejriwal</option>
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 ">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className="block mb-2 tracking-wide text-lg">
              How will the seats be shared?
            </div>
            <div className="flex justify-center">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide mb-2"
                  htmlFor="bjp"
                >
                  BJP
                </label>
                <input
                  className="text-center block bg-grey-lighter  border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="bjp"
                  type="number"
                  placeholder="182"
                  name="prediction[answer_3]"
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide    mb-2"
                  htmlFor="congress"
                >
                  Congress
                </label>
                <input
                  className="appearance-none block text-center w-full bg-grey-lighter  border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="congress"
                  type="number"
                  placeholder="182"
                  name="prediction[answer_4]"
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase text-center tracking-wide    mb-2"
                  htmlFor="others"
                >
                  Others
                </label>
                <input
                  className="appearance-none text-center block w-full bg-grey-lighter  border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="others"
                  type="number"
                  placeholder="181"
                  name="prediction[answer_5]"
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-6">
            <label
              className="block uppercase tracking-wide    mb-2"
              htmlFor="others"
            >
              Coins To Bet
            </label>
            <div className="relative w-full md:w-1/2 mx-auto">
              <input
                className="appearance-none text-center block w-full bg-grey-lighter  border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="others"
                type="number"
                placeholder="200"
                name="prediction[coins_used]"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-white hover:bg-grey text-blue  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" value="Submit">
              Submit Your Prediction
            </button>
          </div>
        </form>
      </div>
    );
  }
}


QuestionCard.propTypes = {
  authenticityToken: PropTypes.string
};

