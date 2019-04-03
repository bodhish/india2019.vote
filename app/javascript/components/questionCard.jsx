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
            othersCount: 543,
            coins: 200,
        };
        this.updateAnswer3 = this.updateAnswer3.bind(this);
        this.updateAnswer4 = this.updateAnswer4.bind(this);
        this.saveDisabled = this.saveDisabled.bind(this);
        this.updateCoins = this.updateCoins.bind(this);
        this.updateAnswer1 = this.updateAnswer1.bind(this);
        this.updateAnswer2 = this.updateAnswer2.bind(this);
    }

    updateAnswer3(e) {
        let value = e.target.value
        let answer3 = value.length < 1 ? 0 : Math.abs(parseInt(value));
        if (answer3 > 543) {
            this.setState({
                answer3: 543,
                answer4: 0,
                othersCount: 0
            });
        } else if ((answer3 + this.state.answer4) > 543) {
            let answer4 = 543 - answer3
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

    updateAnswer4(e) {
        let value = e.target.value
        let answer4 = value.length < 1 ? 0 : Math.abs(parseInt(value));
        if (answer4 > 543) {
            this.setState({
                answer3: 0,
                answer4: 543,
                othersCount: 0
            });
        } else if ((this.state.answer3 + answer4) > 543) {
            let answer3 = 543 - answer4
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
        let value = e.target.value
        let inputCoins = value.length < 1 ? value : Math.abs(parseInt(value));

        if (value.length < 3) {
            this.setState({
                coins: inputCoins
            });
        } else if (inputCoins < 199) {
            this.setState({
                coins: 200
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

    updateAnswer1(e) {
        this.setState({
            answer1: e.target.value
        });
    }

    updateAnswer2(e) {
        this.setState({
            answer2: e.target.value
        });
    }


    saveDisabled() {
        let invalidSeatCount = !((this.state.answer3 + this.state.answer4 + this.state.othersCount) === 543);
        let coinsGreaterThanMin = (199 < this.state.coins);
        let coinsLessThanMax = (this.state.coins < this.props.coinsLeft);
        let InValidAnswer1 = this.state.answer1.length < 2
        let InValidAnswer2 = this.state.answer2.length < 2
        return (InValidAnswer1 || InValidAnswer2 || invalidSeatCount || !coinsGreaterThanMin || !coinsLessThanMax);
    }

    render() {
        return (
            <div className="w-full">
                {(this.props.coinsLeft > 199) &&
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
                                onChange={this.updateAnswer1}
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
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
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
                                onChange={this.updateAnswer2}
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
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
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
                                    value={this.state.answer3}
                                    onChange={this.updateAnswer3}
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
                                    value={this.state.answer4}
                                    onChange={this.updateAnswer4}
                                />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase text-center tracking-wide    mb-2"
                                    htmlFor="others"
                                >
                                    Others
                                </label>
                                <p
                                    className="appearance-none text-center text-black block w-full bg-grey-lighter  border border-grey-lighter rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                    id="others"
                                >
                                    {this.state.othersCount}
                                </p>
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
                                min="200" max={this.props.coinsLeft}
                                value={this.state.coins}
                                onChange={this.updateCoins}
                                name="prediction[coins_used]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <button
                            className="bg-white hover:bg-grey text-blue  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" value="Submit"
                            disabled={this.saveDisabled()}>
                            Submit Your Prediction

                        </button>
                    </div>
                </form>}
            </div>
        );
    }
}


QuestionCard.propTypes = {
    authenticityToken: PropTypes.string,
    coinsLeft: PropTypes.number
};

