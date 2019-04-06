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
                        <div key={prediction.id} className="p-2">
                            <h4>{prediction.id}</h4>
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
        );
    }
}

PredictionsFeed.propTypes = {
    latestPredictions: PropTypes.array
};
