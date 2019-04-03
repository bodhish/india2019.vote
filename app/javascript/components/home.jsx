import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import QuestionCard from "./questionCard";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      userImage: props.userImage,
    };
  }

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
                <p className="text-white leading-none">1000</p>
              </div>
            </div>
          </div>

          <div className="w-full ">
            <QuestionCard authenticityToken={this.props.authenticityToken}/>
          </div>
        </div>

        <div className="mt-3 flex flex-col w-full md:w-2/5 justify-center items-center text-center">
          <div className="w-full bg-grey shadow rounded">
            <div className="flex items-center justify-between p-2">
              <div className="flex justify-center items-center text-center">
                <div className="pl-2 text-left text-sm">
                  <h4>Prediction 1 </h4>
                  <p className="pt-2 pb-2 text-white leading-none">
                    Winning party: Congress <br />
                    Prime minister: Rahul Gandhi
                    <br />
                    Seat share: BJP - 180, Congress - 100, Others - 120
                    <br />
                  </p>
                </div>
              </div>
              <div className="flex mr-2 align-right">
                <p className="text-white leading-none">Coins:&nbsp;</p>
                <p className="text-white leading-none">300</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col w-full md:w-2/5 justify-center items-center text-center">
          <div className="w-full bg-grey shadow rounded">
            <div className="flex items-center justify-between p-2">
              <div className="flex justify-center items-center text-center">
                <div className="pl-2 text-left text-sm">
                  <h4>Prediction 3 </h4>
                  <p className="pt-2 pb-2 text-white leading-none">
                    Winning party: Congress <br />
                    Prime minister: Rahul Gandhi
                    <br />
                    Seat share: BJP - 180, Congress - 100, Others - 120
                    <br />
                  </p>
                </div>
              </div>
              <div className="flex mr-2 align-right">
                <p className="text-white leading-none">Coins:&nbsp;</p>
                <p className="text-white leading-none">300</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col w-full md:w-2/5 justify-center items-center text-center">
          <div className="w-full bg-grey shadow rounded">
            <div className="flex items-center justify-between p-2">
              <div className="flex justify-center items-center text-center">
                <div className="pl-2 text-left text-sm">
                  <h4>Prediction 3 </h4>
                  <p className="pt-2 pb-2 text-white leading-none">
                    Winning party: Congress <br />
                    Prime minister: Rahul Gandhi
                    <br />
                    Seat share: BJP - 180, Congress - 100, Others - 120
                    <br />
                  </p>
                </div>
              </div>
              <div className="flex mr-2 align-right">
                <p className="text-white leading-none">Coins:&nbsp;</p>
                <p className="text-white leading-none">300</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  userName: PropTypes.string,
  userImage: PropTypes.string,
  authenticityToken: PropTypes.string
};
