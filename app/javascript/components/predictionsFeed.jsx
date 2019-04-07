import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
export default class PredictionsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { latestPredictions: props.latestPredictions };
        this.fetchPredictions = this.fetchPredictions.bind(this);
    }
    componentDidMount() {
        this.timer = setInterval(() => this.fetchPredictions(), 5000);
    }

    componentWillUnmount() {
        this.timer = null;
    }

    fetchPredictions = () => {
        let nextId = this.state.latestPredictions[0].id;
        fetch("predictions/" + nextId)
            .then(response => response.json())
            .then(result => {
                if (result !== null) {
                    this.setState({
                        latestPredictions: [result].concat(this.state.latestPredictions.slice(0, -1))
                    });
                }
            })
            .catch(e => console.log(e));
    };

    render() {
        return (
            <div className="p-2 m-4">
                {this.state.latestPredictions.map(prediction => {
                    return (
                        <div key={prediction.id} className="p-2 my-3 flex flex-col border border-blue rounded">
                            <div className="flex justify-between">
                                <div className="w-1/4 overflow-hidden truncate">
                                    <img className="w-12 h-12 rounded-full" src={prediction.user_image} />
                                    <div className="text-sm">{prediction.user_name}</div>
                                    {prediction.user_party && (<div className="text-xs text-grey">Supports {prediction.user_party} <br /> from {prediction.user_state}</div>)}
                                </div>
                                <div className="text-sm text-left">
                                    Party: {prediction.answer_1}<br />
                                    P.M: {prediction.answer_2}<br />
                                    BJP: {prediction.answer_3}<br />
                                    CNG: {prediction.answer_4}<br />
                                    OTH: {543 - prediction.answer_3 - prediction.answer_4}
                                </div>
                                <div className="text-sm">
                                    {prediction.coins_used} coins
                                </div>
                            </div>
                            <div className="text-xs text-grey text-right">{prediction.minutes_or_hours_ago}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

PredictionsFeed.propTypes = {
    latestPredictions: PropTypes.array
};
