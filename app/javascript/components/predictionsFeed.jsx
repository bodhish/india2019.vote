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
            <div className="border p-2 m-4">
                {this.state.latestPredictions.map(prediction => {
                    return (
                        <div key={prediction.id} className="p-2 flex flex-col">
                            <div className="flex justify-between">
                                <div>
                                    <img className="w-12 h-12 rounded-full" src={prediction.user_image}/>
                                    {prediction.user_party && (<div>{prediction.user_party}, {prediction.user_state}</div>)}
                                </div>
                                <div>
                                    {prediction.answer_1}, {prediction.answer_2}<br/>
                                    {prediction.answer_3}/{prediction.answer_4}
                                </div>
                                <div className="text-xs">
                                    {prediction.coins_used} coins
                                </div>
                            </div>
                            <div className="text-xs text-grey">{prediction.minutes_or_hours_ago}</div>
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
