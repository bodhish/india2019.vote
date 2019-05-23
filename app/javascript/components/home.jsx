import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import QuestionCard from "./questionCard";
import EditProfile from "./editProfile";
import { Whatsapp } from "react-social-sharing";
import { Twitter } from "react-social-sharing";
import PredictionsFeed from "./predictionsFeed";
import Screenshot from "./screenshot";
import Logout from "./logout";
import ndaImg from "../assets/NDA.svg";
import incImg from "../assets/INC.svg";
import rgImg from "../assets/Rahul-gandhi.jpg";
import namoImg from "../assets/Narendra-modi.jpg";
import avatar from "../assets/avatar.png";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showProfile: false,
      latestPredictions: props.feedStart
    };
    this.coinsLeft = this.coinsLeft.bind(this);
    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.toggleShowProfile = this.toggleShowProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getFormattedDate = this.getFormattedDate.bind(this);
    this.mathForGraph = this.mathForGraph.bind(this);
    this.handlePMImage = this.handlePMImage.bind(this);
    this.handlePartyImage = this.handlePartyImage.bind(this);
  }

  coinsLeft() {
    const arrSum = arr => arr.reduce((a, b) => a + b, 0);
    let coinsUsed = arrSum(
      this.props.predictions.map(prediction => prediction.coinsUsed)
    );
    return 1000 - coinsUsed;
  }
  toggleShowProfile(e) {
    e.preventDefault();
    this.updateProfile();
  }

  handlePMImage(answer) {
    if (answer == "Rahul Gandhi") {
      return rgImg;
    } else if (answer == "Narendra Modi") {
      return namoImg;
    } else return avatar;
  }
  handlePartyImage(answer) {
    if (answer == "UPA") {
      return incImg;
    } else if (answer == "NDA") {
      return ndaImg;
    } else return avatar;
  }

  updateProfile() {
    this.setState({
      showProfile: !this.state.showProfile
    });
  }
  toggleShowForm(e) {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    });
  }

  getFormattedDate() {
    let todayTime = new Date();
    return todayTime.toLocaleString();
  }

  mathForGraph(value) {
    return (value / 543) * 100;
  }

  render() {
    let pbUPA =
      this.props.stats.party.predictions_count["UPA"] / this.props.stats.total;
    let pbNDA =
      this.props.stats.party.predictions_count["NDA"] / this.props.stats.total;
    let pbOtherParty = 1 - pbUPA - pbNDA;

    let pbModi =
      this.props.stats.primeMinister.predictions_count["Narendra Modi"] /
      this.props.stats.total;

    let pbRG =
      this.props.stats.primeMinister.predictions_count["Rahul Gandhi"] /
      this.props.stats.total;

    let pbOtherPM = 1 - pbModi - pbRG;

    let facebookShareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Findia2019.vote/" +
      this.props.user.slug +
      "&hashtag=%23India2019";
    let shareUrl = "https://india2019.vote/" + this.props.user.slug;
    let shareMessage =
      "Do you know India's pulse? Make your predictions for the Indian elections 2019 & follow what others are predicting.";
    let partyImage = {
      BJP:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/1200px-Bharatiya_Janata_Party_logo.svg.png",
      INC:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_the_Indian_National_Congress.svg/500px-Flag_of_the_Indian_National_Congress.svg.png",
      CPI:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/CPI-banner.svg/400px-CPI-banner.svg.png",
      "CPI(M)":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/CPI-M-flag.svg/400px-CPI-M-flag.svg.png",
      BSP:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Elephant_Bahujan_Samaj_Party.svg/400px-Elephant_Bahujan_Samaj_Party.svg.png",
      AITC:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/All_India_Trinamool_Congress_flag.svg/500px-All_India_Trinamool_Congress_flag.svg.png",
      NCP:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_Nationalist_Congress_Party.svg/400px-Flag_of_Nationalist_Congress_Party.svg.png"
    };
    return (
      <div>
        {this.state.showForm ? (
          <div className="">
            <QuestionCard
              authenticityToken={this.props.authenticityToken}
              coinsLeft={this.coinsLeft()}
              toggleShowFormCB={this.toggleShowForm}
            />
          </div>
        ) : (
          <div className="relative overflow-x-hidden">
            {this.state.showProfile && this.props.isCurrentUser ? (
              <div className="w-full">
                <EditProfile
                  authenticityToken={this.props.authenticityToken}
                  closeButton={this.updateProfile}
                  user={this.props.user}
                />
              </div>
            ) : (
              <div className="flex flex-col w-full md:w-2/3 bg-white relative justify-between">
                <div className="w-full p-4 flex flex-col bg-white items-center">
                  <div
                    className="flex flex-col max-w-md w-full justify-center items-center text-center"
                    id="profile"
                  >
                    <div className="w-full px-3">
                      <div className="flex items-center bg-white justify-between p-3 mx-0 md:px-6 md:py-5 md:mx-3 shadow rounded-t-xl border border-b-0">
                        <div className="flex justify-center items-center text-center">
                          {this.props.user.image && (
                            <img
                              className="w-10 md:w-13 h-10 md:h-13 bg-primary-lightest border-2 border-primary-light shadow-md rounded-full mr-3"
                              src={this.props.user.image.replace(
                                "http://graph.facebook.com/",
                                "https://graph.facebook.com/"
                              )}
                              alt="photo"
                            />
                          )}
                          <div className="flex flex-col text-left font-medium">
                            <div>
                              <p className="text-sm">{this.props.user.name}</p>
                            </div>
                            <div className="flex mt-1">
                              {this.props.user.state.length > 0 && (
                                <div className="text-xs text-grey-dark">
                                  {this.props.user.state}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <h5 className="font-medium text-primary-dark">
                            #indiaVote2019
                          </h5>
                        </div>
                      </div>
                      <div className="isupport-card isupport-card--bjp flex flex-col bg-primary shadow-lg p-3 md:p-8 text-white -mx-3 rounded-xl">
                        <div className="flex flex-row justify-between items-center text-left px-4">
                          <div>
                            <div className="text-lg text-white">I support</div>
                            {this.props.user.party.length > 0 ? (
                              <div className="text-4xl md:text-5xl font-semibold text-white">
                                {this.props.user.party}
                              </div>
                            ) : (
                              <div
                                className="text-xs text-white cursor-pointer"
                                onClick={this.toggleShowProfile}
                              >
                                <div className="text-base border border-dashed hover:bg-primary-lightest text-primary-lightest hover:text-primary-dark border-primary-lighter bg-transparent mt-2 rounded">
                                  <div className="px-2 py-2">Add my party</div>
                                </div>
                              </div>
                            )}
                            <div className="text-sm md:text-lg pt-6">
                              India2019.vote
                            </div>
                          </div>
                          {this.props.user.party && (
                            <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                              <img
                                className="p-2 rounded-lg party-flag h-32"
                                src={partyImage[this.props.user.party]}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {this.props.isCurrentUser && (
                    <div className="max-w-md w-full px-3 md:px-6">
                      <div className="w-full flex border border-t-0 rounded-b-lg shadow bg-white">
                        <div className="w-1/2">
                          <Screenshot elementID="profile" />
                        </div>

                        <div className="w-1/2 border-l">
                          <button
                            onClick={this.toggleShowProfile}
                            className="text-primary text-xs text-center h-9 w-full cursor-pointer hover:bg-primary-lightest hover:text-primary-dark focus:outline-none"
                          >
                            Edit profile
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {this.props.predictions.length > 0 && (
                    <div className="flex flex-col max-w-md w-full mt-10">
                      <h5 className="uppercase text-xs font-medium text-center md:pb-0 pb-4 md:text-left md:pl-2 ">
                        {this.props.isCurrentUser
                          ? "My predictions"
                          : this.props.user.name + "'s predictions"}
                      </h5>
                      {this.props.predictions.map((prediction, index) => (
                        <div
                          key={prediction.id}
                          className="mt-2 pb-10 flex flex-col max-w-md w-full"
                        >
                          <div
                            id={"p" + prediction.id}
                            className="bg-white my-predicted-list-card-container p-0 w-full text-white shadow rounded-xl"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 justify-center items-center text-center">
                                <div className="text-left text-black text-sm">
                                  <div className="my-predicted-list-card text-white p-5 relative">
                                    <h4 className="my-predicted-list-card-title inline-block absolute bg-white border border-primary rounded-lg font-medium text-primary text-center p-2 text-xs uppercase">
                                      Prediction {index + 1}{" "}
                                    </h4>
                                    <div className="flex flex-wrap md:flex-nowrap">
                                      <div className="w-1/2 md:w-1/3 flex items-center justify-center pt-4">
                                        <div className="flex flex-col">
                                          <div className="winning-part__logo px-2 rounded-lg flex justify-center items-center">
                                            <img
                                              className="w-18 h-18 rounded-full border-2 border-white bg-white"
                                              src={this.handlePartyImage(
                                                prediction.answer1
                                              )}
                                            />
                                          </div>
                                          <div className="pl-2 pr-5 text-center">
                                            <div className="text-xs pt-2">
                                              Winning party
                                            </div>
                                            <p className="font-semibold pt-1">
                                              {prediction.answer1}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="w-1/2 md:w-1/3 flex items-center justify-center pt-4 md:border-r border-primary-darker">
                                        <div className="flex flex-col">
                                          <div className="winning-part__logo px-2 rounded-lg flex justify-center items-center">
                                            <img
                                              className="w-18 h-18 rounded-full border-2 border-white bg-white"
                                              src={this.handlePMImage(
                                                prediction.answer2
                                              )}
                                            />
                                          </div>
                                          <div className="pl-2 pr-5 text-center">
                                            <p className="text-xs pt-2">
                                              Prime minister
                                            </p>
                                            <p className="font-semibold pt-1">
                                              {prediction.answer2}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="w-full md:w-1/3 flex flex-col items-center justify-center font-medium pt-5 md:pt-0 md:border-l border-primary-light relative ">
                                        <div>
                                          <div className="coin-bg flex shadow-lg justify-center items-center mx-auto">
                                            <span class="text-xl font-bold coin-currency text-center">
                                              {prediction.coinsUsed}
                                            </span>
                                          </div>
                                          <span className="block mt-2">
                                            Coins used
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-5">
                                    <div className="flex flex-end">
                                      <div className="w-full">
                                        <h5 className="font-medium">
                                          NDA - {prediction.answer3} seats
                                        </h5>
                                        <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                          <div
                                            className="bg-inv-orange text-xs leading-none rounded-full py-1 text-center text-white"
                                            style={{
                                              width:
                                                (prediction.answer3 / 543) *
                                                  100 +
                                                "%"
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <h5 className="font-medium pt-3 pl-3">
                                        {(
                                          (prediction.answer3 / 543) *
                                          100
                                        ).toFixed()}
                                        %
                                      </h5>
                                    </div>
                                    <div className="mt-4 flex flex-end">
                                      <div className="w-full">
                                        <h5 className="font-medium">
                                          UPA - {prediction.answer4} seats
                                        </h5>
                                        <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                          <div
                                            className="bg-inv-blue text-xs leading-none rounded-full py-1 text-center text-white"
                                            style={{
                                              width:
                                                (prediction.answer4 / 543) *
                                                  100 +
                                                "%"
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <h5 className="font-medium pt-3 pl-3">
                                        {(
                                          (prediction.answer4 / 543) *
                                          100
                                        ).toFixed()}
                                        %
                                      </h5>
                                    </div>
                                    <div className="mt-4 flex flex-end">
                                      <div className="w-full">
                                        <h5 className="font-medium">
                                          OTHERS -{" "}
                                          {543 -
                                            prediction.answer3 -
                                            prediction.answer4}{" "}
                                          seats
                                        </h5>
                                        <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                          <div
                                            className="bg-inv-yellow text-xs leading-none rounded-full py-1 text-center text-white"
                                            style={{
                                              width:
                                                this.mathForGraph(
                                                  543 -
                                                    prediction.answer3 -
                                                    prediction.answer4
                                                ) + "%"
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <h5 className="font-medium pt-3 pl-3">
                                        {this.mathForGraph(
                                          543 -
                                            prediction.answer3 -
                                            prediction.answer4
                                        ).toFixed()}
                                        %
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {this.props.isCurrentUser && (
                            <div className="max-w-md w-full px-3 md:px-6">
                              <div className="w-full flex border border-t-0 rounded-b-lg shadow bg-white">
                                <div className="w-1/2">
                                  <Screenshot elementID={"p" + prediction.id} />
                                </div>

                                <div className="w-1/2 border-l">
                                  <form
                                    className="button_to w-full"
                                    method="post"
                                    action={"predictions/" + prediction.id}
                                  >
                                    <input
                                      name="_method"
                                      value="delete"
                                      type="hidden"
                                    />
                                    <input
                                      className="text-red text-xs w-full h-9 cursor-pointer hover:bg-red-lightest rounded-br-lg hover:text-red-dark focus:outline-none"
                                      value="Delete"
                                      type="submit"
                                    />
                                    <input
                                      name="authenticity_token"
                                      type="hidden"
                                      value={this.props.authenticityToken}
                                    />
                                  </form>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {this.props.isCurrentUser && (
                    <div className="flex flex-col max-w-md w-full mt-10">
                      <div className="uppercase text-xs font-medium pl-2">
                        Current Standings
                      </div>
                      <div className="w-full flex flex-col justify-between mt-2">
                        <div
                          id="next-govt"
                          className="bg-white current-standings-card"
                        >
                          <div className="pb-3">
                            <h3 className="font-medium text-primary-darker">
                              Who will form the government in 2019?
                            </h3>
                            <div className="text-sm pt-1">
                              from {this.props.stats.total + 5000} predictions
                              till now
                            </div>
                          </div>
                          <div className="mt-4 flex flex-end">
                            <div className="w-full">
                              <h5 className="font-medium">NDA</h5>
                              <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                <div
                                  className="bg-inv-orange text-xs leading-none rounded-full py-1 text-center text-white"
                                  style={{ width: pbNDA * 100 + "%" }}
                                />
                              </div>
                            </div>
                            <h5 className="font-medium pt-3 pl-3">
                              {(pbNDA * 100).toFixed()}%
                            </h5>
                          </div>
                          <div className="mt-4 flex flex-end">
                            <div className="w-full">
                              <h5 className="font-medium">UPA</h5>
                              <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                <div
                                  className="bg-inv-blue text-xs leading-none rounded-full py-1 text-center text-white"
                                  style={{ width: pbUPA * 100 + "%" }}
                                />
                              </div>
                            </div>
                            <h5 className="font-medium pt-3 pl-3">
                              {(pbUPA * 100).toFixed()}%
                            </h5>
                          </div>
                          <div className="mt-4 flex flex-end">
                            <div className="w-full">
                              <h5 className="font-medium">OTHERS</h5>
                              <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                <div
                                  className="bg-inv-yellow text-xs leading-none rounded-full py-1 text-center text-white"
                                  style={{ width: pbOtherParty * 100 + "%" }}
                                />
                              </div>
                            </div>
                            <h5 className="font-medium pt-3 pl-3">
                              {(pbOtherParty * 100).toFixed()}%
                            </h5>
                          </div>
                          <div className="flex flex-row justify-between">
                            <p className="text-sm md:text-base pt-6">
                              Let's vote for a Better India
                            </p>
                            <p className="text-sm md:text-base pt-6">
                              India2019.vote
                            </p>
                          </div>
                        </div>
                        {this.props.isCurrentUser && (
                          <div className="max-w-md w-full px-3 md:px-6">
                            <div className="w-full flex border border-t-0 rounded-b-lg shadow bg-white">
                              <div className="w-full">
                                <Screenshot elementID="next-govt" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="w-full py-3" />
                        <div
                          id="next-pm"
                          className="bg-white current-standings-card"
                        >
                          <div className="pb-3">
                            <h3 className="font-medium text-primary-darker">
                              Who will be the prime minister?
                            </h3>
                            <div className="text-sm pt-1">
                              from {this.props.stats.total + 5000} predictions
                              till now
                            </div>
                          </div>
                          <div className="mt-4 flex flex-end">
                            <div className="w-full">
                              <h5 className="font-medium">Narendra Modi</h5>
                              <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                <div
                                  className="bg-inv-orange text-xs leading-none rounded-full py-1 text-center text-white"
                                  style={{ width: pbModi * 100 + "%" }}
                                />
                              </div>
                            </div>
                            <h5 className="font-medium pt-3 pl-3">
                              {(pbModi * 100).toFixed()}%
                            </h5>
                          </div>
                          <div className="mt-4 flex flex-end">
                            <div className="w-full">
                              <h5 className="font-medium">Rahul Gandhi</h5>
                              <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                <div
                                  className="bg-inv-blue text-xs leading-none rounded-full py-1 text-center text-white"
                                  style={{ width: pbRG * 100 + "%" }}
                                />
                              </div>
                            </div>
                            <h5 className="font-medium pt-3 pl-3">
                              {(pbRG * 100).toFixed()}%
                            </h5>
                          </div>
                          <div className="mt-4 flex flex-end">
                            <div className="w-full">
                              <h5 className="font-medium">Others</h5>
                              <div className="shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full">
                                <div
                                  className="bg-inv-yellow text-xs leading-none rounded-full py-1 text-center text-white"
                                  style={{ width: pbOtherPM * 100 + "%" }}
                                />
                              </div>
                            </div>
                            <h5 className="font-medium pt-3 pl-3">
                              {(pbOtherPM * 100).toFixed()}%
                            </h5>
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="text-sm md:text-base pt-6">
                              Let's vote for a Better India
                            </div>
                            <div className="text-sm md:text-base pt-6">
                              India2019.vote
                            </div>
                          </div>
                        </div>
                        {this.props.isCurrentUser && (
                          <div className="max-w-md w-full px-3 md:px-6">
                            <div className="w-full flex border border-t-0 rounded-b-lg shadow bg-white">
                              <div className="w-full">
                                <Screenshot elementID="next-pm" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col max-w-md w-full mt-10">
                          <div className="uppercase text-xs font-medium pl-2">
                            Average seats predicted:
                          </div>
                          <div className="flex avg-seats-prediction-card mt-2">
                            <div className="w-1/3 my-4 p-3 flex flex-col justify-center items-center">
                              <div className="w-25 h-25 md:w-28 md:h-28 avg-seats-predicted avg-seats-predicted--nda flex justify-center items-start">
                                <h3 className="font-semibold mt-5 rounded-full bg-orange-darker text-white w-10 h-10 text-sm flex justify-center items-center">
                                  {this.props.stats.bjpAvgSeats}
                                </h3>
                              </div>
                              <p className="text-sm text-center pt-4 font-semibold">
                                NDA
                              </p>
                            </div>
                            <div className="w-1/3 my-4 p-3 flex flex-col justify-center items-center">
                              <div className="w-25 h-25 md:w-28 md:h-28 avg-seats-predicted avg-seats-predicted--inc flex justify-center items-start">
                                <h3 className="font-semibold mt-5 rounded-full bg-primary-dark text-white w-10 h-10 text-sm flex justify-center items-center">
                                  {this.props.stats.congAvgSeats}
                                </h3>
                              </div>
                              <p className="text-sm text-center pt-4 font-semibold">
                                UPA
                              </p>
                            </div>
                            <div className="w-1/3 my-4 p-3 flex flex-col justify-center items-center">
                              <div className="w-25 h-25 md:w-28 md:h-28 avg-seats-predicted avg-seats-predicted--others flex justify-center items-start">
                                <h3 className="font-semibold mt-5 rounded-full bg-yellow-darker text-white w-10 h-10 text-sm flex justify-center items-center">
                                  {543 -
                                    this.props.stats.bjpAvgSeats -
                                    this.props.stats.congAvgSeats}
                                </h3>
                              </div>
                              <p className="text-sm text-center pt-4 font-semibold">
                                OTHERS
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap mt-4 justify-center">
                        <a
                          className="m-2 no-underline flex item-center text-center appearance-none bg-blue hover:bg-blue-dark text-white rounded"
                          href={facebookShareUrl}
                          target="_blank"
                        >
                          <span className="p-2">Share on Facebook</span>
                        </a>
                        <div className="hidden sm:block ">
                          <Whatsapp
                            solidcircle
                            big
                            message={shareMessage}
                            link={shareUrl}
                          />
                        </div>
                        <Twitter
                          solidcircle
                          big
                          message={shareMessage}
                          link={shareUrl}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-center mt-5 pb-6 md:pb-24">
                  <span className="uppercase text-xs">Contact us</span>
                  <div className="mt-4 px-2">
                    <div className="max-w-xs w-full flex hover:border-primary-light justify-center border rounded overflow-hidden mx-auto">
                      <a
                        className="w-1/3 flex-1 text-primary text-sm p-2 hover:bg-primary-lightest no-underline border-r border-primary-lighter"
                        href="mailto:india2019.vote@gmail.com"
                      >
                        {" "}
                        Mail
                      </a>{" "}
                      <a
                        className="w-1/3 flex-1 text-primary text-sm p-2 hover:bg-primary-lightest hover:border-primary-light no-underline border-r border-primary-lighter"
                        target="_blank"
                        href="https://twitter.com/india2019_vote"
                      >
                        Twitter
                      </a>
                      <a
                        className="w-1/3 flex-1 text-primary text-sm p-2 hover:bg-primary-lightest no-underline"
                        href="https://www.facebook.com/india2019.vote"
                        target="_blank"
                      >
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="notification w-full md:w-1/3 sm:flex sm:flex-col bg-grey-lightest shadow-inner md:border-l items-center sm:fixed pin-b pin-t pin-r relative pb-24 sm:pb-0 z-10 px-5 pt-5">
              <PredictionsFeed latestPredictions={this.props.feedStart} />
            </div>
          </div>
        )}
        {!this.state.showForm && (
          <div className="w-full md:w-2/3 bg-white fixed pin-b z-20">
            {this.props.isCurrentUser ? (
              <div className="p-2 w-full flex flex-row justify-center items-center border-t">
                <div className="flex">
                  <Logout authenticityToken={this.props.authenticityToken} />
                </div>
                <div className="flex flex-1 justify-center items-center">
                  <div className="flex items-center border rounded-full bg-primary-lightest px-2 py-1 m-2">
                    <p className="text-xs">Coins left:&nbsp;</p>
                    <p className="text-sm md:text-base">{this.coinsLeft()}</p>
                  </div>

                  <div className="">
                    {this.coinsLeft() > 299 && !this.state.showForm && (
                      <button className="p-2 rounded btn text-sm" disabled>
                        New Prediction (disabled)
                      </button>
                    )}
                  </div>
                </div>
                {this.coinsLeft() < 300 && (
                  <div className="text-xs bg-red-lightest rounded p-2 text-red">
                    {" "}
                    You need minimum 300 coins to make a prediction
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2 w-full flex flex-row justify-center items-center border-t">
                <a
                  href="./"
                  className="p-2 no-underline rounded btn text-black"
                >
                  Predict Now
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
Home.propTypes = {
  user: PropTypes.object,
  authenticityToken: PropTypes.string,
  predictions: PropTypes.array,
  isCurrentUser: PropTypes.bool,
  stats: PropTypes.object,
  feedStart: PropTypes.array
};
