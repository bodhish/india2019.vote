import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import QuestionCard from "./questionCard";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.coinsLeft = this.coinsLeft.bind(this)
  }


  coinsLeft() {
    const arrSum = arr => arr.reduce((a,b) => a + b, 0)
    let coinsUsed = arrSum(this.props.predictions.map(prediction =>(prediction.coinsUsed)))
    return 1000 - coinsUsed
  };


  render() {
    return (
      <div className="p-4 flex flex-col bg-white flex justify-center items-center text-center">
        <div className="m-2 flex flex-col w-full md:w-2/5 justify-center items-center text-center question-card shadow rounded">
          <div className="w-full p-2">
            <div className="flex items-center border-b-2 justify-between p-2">
              <div className="flex justify-center items-center text-center">
                <img
                  className="w-10 border-2 border-white h-10 rounded-full mr-2"
                  src={this.props.userImage}
                  alt="photo"
                />
                <div className="text-sm">
                  <p className="text-white leading-none">
                    {this.props.userName}
                  </p>
                </div>
              </div>
              <div className="flex mr-2 align-right">
                <p className="text-white leading-none">Coins left:&nbsp;</p>
                <p className="text-white leading-none">{this.coinsLeft()}</p>
              </div>
            </div>
          </div>
          <div>Current Standings</div>
          <div className="w-full py-2 px-8 flex justify-between">
            <div className="flex flex-col">
              <div className="my-1">BJP: {this.props.stats.party['BJP']}</div>
              <div className="my-1">CON: {this.props.stats.party['Congress']}</div>
              <div className="my-1">NDA: {this.props.stats.party['NDA']}</div>
              <div className="my-1">UPA: {this.props.stats.party['UPA']}</div>
            </div>
            <div className="flex flex-col">
              <div className="my-1">Modi: {this.props.stats.primeMinister['Narendra Modi']}</div>
              <div className="my-1">Rahul: {this.props.stats.primeMinister['Rahul Gandhi']}</div>
              <div className="my-1">Mamata: {this.props.stats.primeMinister['Mamata Banerjee']}</div>
              <div className="my-1">Kejriwal: {this.props.stats.primeMinister['Arvind Kejriwal']}</div>
            </div>
            <div className="flex flex-col">
              <div className="mb-2">Seats predicted:</div>
              <div className="my-1">BJP: {this.props.stats.bjpAvgSeats}</div>
              <div className="my-1">Congress: {this.props.stats.congAvgSeats}</div>
            </div>
          </div>
          {
            this.props.isCurrentUser &&
            (
                <div className="w-full ">
                  <QuestionCard authenticityToken={this.props.authenticityToken} coinsLeft={this.coinsLeft()}/>
                </div>
            )
          }
        </div>

        {this.props.predictions.map((prediction,index) => (
            <div key={prediction.id} className="mt-3 flex flex-col w-full md:w-2/5 justify-center items-center text-center">
              <div className="w-full bg-grey shadow rounded">
                <div className="flex items-center justify-between p-2">
                  <div className="flex justify-center items-center text-center">
                    <div className="pl-2 text-left text-sm">
                      <h4>Prediction {index + 1} </h4>
                      <p className="pt-2 pb-2 text-white leading-none">
                        Winning party: {prediction.answer1} <br />
                        Prime minister: {prediction.answer2}
                        <br />
                        Seat share: BJP - {prediction.answer3}, Congress - {prediction.answer4}, Others - {543 - prediction.answer3 -prediction.answer4}
                        <br />
                      </p>
                    </div>
                  </div>
                  <div className="flex mr-2 align-right">
                    <p className="text-white leading-none">Coins:&nbsp;</p>
                    <p className="text-white leading-none">{prediction.coinsUsed}</p>
                  </div>
                  {
                    this.props.isCurrentUser &&
                    (
                      <form className="button_to" method='post' action={"predictions/" + prediction.id}>
                        <input name='_method' value='delete' type='hidden'></input>
                        <input value='Delete' type='submit'></input>
                        <input name="authenticity_token" type="hidden" value={this.props.authenticityToken}></input>
                      </form>
                    )
                  }
                </div>
              </div>
            </div>
             ))}
      </div>
    );
  }
}

Home.propTypes = {
  userName: PropTypes.string,
  userImage: PropTypes.string,
  authenticityToken: PropTypes.string,
  predictions: PropTypes.array,
  isCurrentUser: PropTypes.bool,
  stats: PropTypes.object
};
