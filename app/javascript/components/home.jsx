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
  render() {
    let facebookShareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Findia2019.vote&hashtag=%23Inida2019";
    let shareUrl = "https://india2019.vote";
    let shareMessage =
      "Do you know India's pulse? Make your predictions for the Indian elections 2019 & follow what others are predicting.";
    let partyImage = {
      BJP:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/360px-Bharatiya_Janata_Party_logo.svg.png",
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
      <div className="h-screen flex flex-col">
        {this.state.showForm ? (
          <div className="h-screen">
            <QuestionCard
              authenticityToken={this.props.authenticityToken}
              coinsLeft={this.coinsLeft()}
              toggleShowFormCB={this.toggleShowForm}
            />
          </div>
        ) : (
          <div className="overflow-y-scroll">
            <div className="flex flex-col sm:flex-row bg-white relative justify-between">
              <div className="w-full p-4 flex flex-col bg-white items-center">
                <div
                  className="m-2 flex flex-col w-full md:w-4/5 justify-center items-center text-center shadow rounded"
                  id="profile"
                >
                  <div className="w-full p-2">
                    <div className="flex items-center border-b-2 justify-between p-2">
                      <div className="flex justify-center items-center text-center">
                        {this.props.user.image && (
                          <img
                            className="w-10 border-2 border-white h-10 rounded-full mr-2"
                            src={this.props.user.image.replace(
                              "http://graph.facebook.com/",
                              "https://graph.facebook.com/"
                            )}
                            alt="photo"
                          />
                    )}
                    <div className="flex flex-col text-left">
                      <div className="text-sm mb-2">
                        <p className="leading-none">
                          {this.props.user.name}
                        </p>
                      </div>
                      {this.props.user.party !== null && (
                        <div className="text-xs">
                          I support: {this.props.user.party}
                        </div>
                      )}
                      {this.props.user.state !== null && (
                        <div className="text-xs">
                          State: {this.props.user.state}
                        </div>
                      )}
                      {this.props.isCurrentUser && (
                        <button
                          onClick={this.toggleShowProfile}
                          className="text-primary text-xs text-left"
                        >
                          Edit profile
                            </button>
                      )}
                    </div>
                  </div>
                  {this.props.isCurrentUser && (
                    <div className="flex mr-2 align-right">
                      <p className="leading-none">Coins left:&nbsp;</p>
                      <p className="leading-none">{this.coinsLeft()}</p>
                    </div>
                  )}
                </div>
                <img src={partyImage[this.props.user.party]} />
                <div className="m-4">#IndiaVote2019</div>
              </div>
            </div>
            {this.state.showProfile && this.props.isCurrentUser && (
              <div>
                <EditProfile
                  authenticityToken={this.props.authenticityToken}
                  closeButton={this.updateProfile}
                  user={this.props.user}
                />
              </div>
            )}

            <div className="p-2 flex flex-col w-full md:w-4/5 justify-center items-center text-center question-card shadow rounded">
              <div className="p-2 text-white">Current Standings</div>
              <div className="w-full py-2 px-8 flex justify-between text-white">
                <div className="flex flex-col">
                  <div className="my-1">
                    BJP
                        <div className="text-xs">
                      {this.props.stats.party.predictions_count["BJP"]}{" "}
                      predictions,&nbsp;
                          {this.props.stats.party.coins_used["BJP"]} coins
                        </div>
                  </div>
                  <div className="my-1">
                    CON
                        <div className="text-xs">
                      {this.props.stats.party.predictions_count["Congress"]}{" "}
                      predictions,&nbsp;
                          {this.props.stats.party.coins_used["Congress"]} coins
                        </div>
                  </div>
                  <div className="my-1">
                    NDA
                        <div className="text-xs">
                      {this.props.stats.party.predictions_count["NDA"]}{" "}
                      predictions,&nbsp;
                          {this.props.stats.party.coins_used["NDA"]} coins
                        </div>
                  </div>
                  <div className="my-1">
                    UPA
                        <div className="text-xs">
                      {this.props.stats.party.predictions_count["UPA"]}{" "}
                      predictions,&nbsp;
                          {this.props.stats.party.coins_used["UPA"]} coins
                        </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="my-1">
                    Modi
                        <div className="text-xs">
                      {
                        this.props.stats.primeMinister.predictions_count[
                        "Narendra Modi"
                        ]
                      }{" "}
                      predictions,&nbsp;
                          {
                        this.props.stats.primeMinister.coins_used[
                        "Narendra Modi"
                        ]
                      }{" "}
                      coins
                        </div>
                  </div>
                  <div className="my-1">
                    Rahul
                        <div className="text-xs">
                      {
                        this.props.stats.primeMinister.predictions_count[
                        "Rahul Gandhi"
                        ]
                      }{" "}
                      predictions,&nbsp;
                          {
                        this.props.stats.primeMinister.coins_used[
                        "Rahul Gandhi"
                        ]
                      }{" "}
                      coins
                        </div>
                  </div>
                  <div className="my-1">
                    Mamata
                        <div className="text-xs">
                      {
                        this.props.stats.primeMinister.predictions_count[
                        "Mamata Banerjee"
                        ]
                      }{" "}
                      predictions,&nbsp;
                          {
                        this.props.stats.primeMinister.coins_used[
                        "Mamata Banerjee"
                        ]
                      }{" "}
                      coins
                        </div>
                  </div>
                  <div className="my-1">
                    Kejriwal
                        <div className="text-xs">
                      {
                        this.props.stats.primeMinister.predictions_count[
                        "Arvind Kejriwal"
                        ]
                      }{" "}
                      predictions,&nbsp;
                          {
                        this.props.stats.primeMinister.coins_used[
                        "Arvind Kejriwal"
                        ]
                      }{" "}
                      coins
                        </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mb-2">Average seats predicted:</div>
                  <div className="my-1">
                    BJP: {this.props.stats.bjpAvgSeats}
                  </div>
                  <div className="my-1">
                    Congress: {this.props.stats.congAvgSeats}
                  </div>
                </div>
              </div>
            </div>
            {this.props.predictions.map((prediction, index) => (
              <div
                key={prediction.id}
                className="mt-3 flex flex-col w-full md:w-4/5 justify-center items-center text-center"
              >
                <div className="w-full bg-grey shadow rounded">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex justify-center items-center text-center">
                      <div className="pl-2 text-left text-sm">
                        <h4>Prediction {index + 1} </h4>
                        <p className="pt-2 pb-2 leading-none">
                          Winning party: {prediction.answer1} <br />
                          Prime minister: {prediction.answer2}
                          <br />
                          Seat share: BJP - {prediction.answer3}, Congress -{" "}
                          {prediction.answer4}, Others -{" "}
                          {543 - prediction.answer3 - prediction.answer4}
                          <br />
                        </p>
                      </div>
                    </div>
                    <div className="flex mr-2 align-right">
                      <p className="leading-none">Coins:&nbsp;</p>
                      <p className="leading-none">{prediction.coinsUsed}</p>
                    </div>
                    {this.props.isCurrentUser && (
                      <form
                        className="button_to"
                        method="post"
                        action={"predictions/" + prediction.id}
                      >
                        <input
                          name="_method"
                          value="delete"
                          type="hidden"
                        />
                        <input value="Delete" type="submit" />
                        <input
                          name="authenticity_token"
                          type="hidden"
                          value={this.props.authenticityToken}
                        />
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row justify-between">
              <a
                className="m-2 no-underline flex item-center text-center appearance-none bg-blue hover:bg-blue-dark text-white font-bold rounded"
                href={facebookShareUrl}
                target="_blank"
              >
                <span className="font-regular py-2 px-2">
                  Share on Facebook
                    </span>
              </a>
              <div className="visible sm:invisible">
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
            <Screenshot elementID="profile" />
          </div>
          <Screenshot elementID='profile' />
        </div>
        <div className='notification w-1/3 p-4 flex flex-col bg-white flex justify-center items-center text-center z-10'>
          <PredictionsFeed latestPredictions={this.props.feedStart} />
        </div>
        <Logout authenticityToken={this.props.authenticityToken} />
      </div>

      <div className="w-full bg-white absolute pin-b z-20">
        {this.coinsLeft() > 199 && this.props.isCurrentUser && (
          <div className='mt-2 p-2 w-full flex flex-col justify-center items-center'>
            <div className=''>
              {!this.state.showForm && (
                <button
                  className='p-2 rounded btn text-black'
                  onClick={this.toggleShowForm}
                >
                  Add New Prediction
                  </button>
              )}
              {this.state.showForm && (
                <div className='h-screen'>
                  <QuestionCard
                    authenticityToken={this.props.authenticityToken}
                    coinsLeft={this.coinsLeft()}
                    toggleShowFormCB={this.toggleShowForm}
                  />
                </div>
                </div>
          )}
            {this.coinsLeft() < 200 && (
                <div className="mt-2">
                  {" "}
                  You dont have enough coins to make a prediction
                </div>
              )}
            </div>)
          }
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
