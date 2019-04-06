import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import QuestionCard from "./questionCard";
import * as HtmlToImage from "html-to-image";
import * as Download from "downloadjs";
import { Whatsapp } from "react-social-sharing";
import { Twitter } from "react-social-sharing";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      latestPredictions: props.feedStart
    };
    this.coinsLeft = this.coinsLeft.bind(this);
    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.takeAScreenshot = this.takeAScreenshot.bind(this);
    this.fetchPredictions = this.fetchPredictions.bind(this);
  }

  coinsLeft() {
    const arrSum = arr => arr.reduce((a, b) => a + b, 0);
    let coinsUsed = arrSum(
      this.props.predictions.map(prediction => prediction.coinsUsed)
    );
    return 1000 - coinsUsed;
  }

  toggleShowForm(e) {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    });
  }

  takeAScreenshot(e) {
    e.preventDefault();
    const profile = document.getElementById("profile");
    HtmlToImage.toPng(profile)
      .then(function(dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        Download(dataUrl, "My Screenshot");
        // document.body.appendChild(img);
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  }
  componentDidMount() {
    this.fetchPredictions();
    this.timer = setInterval(() => this.fetchPredictions(), 5000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  fetchPredictions = () => {
    let nextId = this.state.latestPredictions.slice(-1)[0].id;
    fetch("predictions/" + nextId)
      .then(response => response.json())
      .then(result => {
        if (result !== null) {
          this.setState({
            latestPredictions: this.state.latestPredictions
              .slice(1)
              .concat(result)
          });
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    let facebookShareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Findia2019.vote&hashtag=%23Inida2019";
    let shareUrl = "https://india2019.vote";
    let shareMessage =
      "Do you know India's pulse? Make your predictions for the Indian elections 2019 & follow what others are predicting.";
    return (
      <div className="p-4 flex flex-col bg-white flex justify-center items-center text-center">
        <div
          className="m-2 flex flex-col w-full md:w-2/5 justify-center items-center text-center question-card shadow rounded"
          id="profile"
        >
          <div className="w-full p-2">
            <div className="flex items-center border-b-2 justify-between p-2">
              <div className="flex justify-center items-center text-center">
                { this.props.user.image && (<img
                  className="w-10 border-2 border-white h-10 rounded-full mr-2"
                  src={this.props.user.image.replace(
                    "http://graph.facebook.com/",
                    "https://graph.facebook.com/"
                  )}
                  alt="photo"
                />)}
                <div className="flex flex-col text-left">
                  <div className="text-sm mb-2">
                    <p className="text-white leading-none">
                      {this.props.user.name}
                    </p>
                  </div>
                  {this.props.user.party !== null && (
                    <div className="text-xs">
                      Party: {this.props.user.party}
                    </div>
                  )}
                  {this.props.user.state !== null && (
                    <div className="text-xs">
                      State: {this.props.user.state}
                    </div>
                  )}
                </div>
              </div>
              {this.props.isCurrentUser && (
                <div className="flex mr-2 align-right">
                  <p className="text-white leading-none">Coins left:&nbsp;</p>
                  <p className="text-white leading-none">{this.coinsLeft()}</p>
                </div>
              )}
            </div>
            <div className="m-4">#IndiaVote2019</div>
          </div>
        </div>
        <div className="border p-2 m-4">
          {this.state.latestPredictions.map(prediction => {
            return (
              <div key={prediction.id} className="p-2">
                <div>
                  {prediction.answer_1}, {prediction.answer_2} (
                  {prediction.answer_3}/{prediction.answer_4})
                </div>
                <div className="text-xs">
                  {prediction.coins_used} coins bet {prediction.minutes_or_hours_ago}
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-2 flex flex-col w-full md:w-2/5 justify-center items-center text-center question-card shadow rounded">
          <div className="p-2">Current Standings</div>
          <div className="w-full py-2 px-8 flex justify-between">
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
                    this.props.stats.primeMinister.coins_used["Narendra Modi"]
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
                    this.props.stats.primeMinister.coins_used["Rahul Gandhi"]
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
                    this.props.stats.primeMinister.coins_used["Mamata Banerjee"]
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
                    this.props.stats.primeMinister.coins_used["Arvind Kejriwal"]
                  }{" "}
                  coins
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-2">Average seats predicted:</div>
              <div className="my-1">BJP: {this.props.stats.bjpAvgSeats}</div>
              <div className="my-1">
                Congress: {this.props.stats.congAvgSeats}
              </div>
            </div>
          </div>
        </div>
        {this.coinsLeft() > 199 && (
          <div className="mt-2 p-2 flex flex-col w-full md:w-2/5 justify-center items-center text-center question-card shadow rounded">
            {this.props.isCurrentUser && (
              <div>
                {!this.state.showForm && (
                  <button className="text-white" onClick={this.toggleShowForm}>
                    Add New Prediction
                  </button>
                )}
                {this.state.showForm && (
                  <div className="w-full ">
                    <QuestionCard
                      authenticityToken={this.props.authenticityToken}
                      coinsLeft={this.coinsLeft()}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {this.coinsLeft() < 200 && (
          <div className="mt-2">
            {" "}
            You dont have enough coins to make a prediction
          </div>
        )}
        {this.props.predictions.map((prediction, index) => (
          <div
            key={prediction.id}
            className="mt-3 flex flex-col w-full md:w-2/5 justify-center items-center text-center"
          >
            <div className="w-full bg-grey shadow rounded">
              <div className="flex items-center justify-between p-2">
                <div className="flex justify-center items-center text-center">
                  <div className="pl-2 text-left text-sm">
                    <h4>Prediction {index + 1} </h4>
                    <p className="pt-2 pb-2 text-white leading-none">
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
                  <p className="text-white leading-none">Coins:&nbsp;</p>
                  <p className="text-white leading-none">
                    {prediction.coinsUsed}
                  </p>
                </div>
                {this.props.isCurrentUser && (
                  <form
                    className="button_to"
                    method="post"
                    action={"predictions/" + prediction.id}
                  >
                    <input name="_method" value="delete" type="hidden" />
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
            <span className="font-regular py-2 px-2">Share on Facebook</span>
          </a>
          <Whatsapp solidcircle big message={shareMessage} link={shareUrl} />
          <Twitter solidcircle big message={shareMessage} link={shareUrl} />
        </div>
        <button onClick={this.takeAScreenshot}>Download Screenshot </button>
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
