import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
export default class PredictionsFeed extends React.Component {
  constructor (props) {
    super(props)
    this.state = { latestPredictions: props.latestPredictions }
    this.fetchPredictions = this.fetchPredictions.bind(this)
  }
  componentDidMount () {
    this.timer = setInterval(() => this.fetchPredictions(), 5000)
  }

  componentWillUnmount () {
    this.timer = null
  }

  fetchPredictions = () => {
    let nextId = this.state.latestPredictions[0].id
    fetch('predictions/' + nextId)
      .then(response => response.json())
      .then(result => {
        if (result !== null) {
          this.setState({
            latestPredictions: [result].concat(
              this.state.latestPredictions.slice(0, -1)
            )
          })
        }
      })
      .catch(e => console.log(e))
  }

  render () {
    return (
      <div className='w-full'>
        {this.state.latestPredictions.map(prediction => {
          return (
            <div
              key={prediction.id}
              className='notification-card border border-primary-lightest my-3 flex flex-col rounded-xl shadow'
            >
              <div className='flex justify-between'>
                <div className='flex w-4/5 overflow-hidden p-3'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={prediction.user_image}
                  />
                  <div className='flex flex-col ml-2'>
                    <div className='text-sm'>{prediction.user_name}</div>

                    {prediction.user_party && (
                      <div className='text-xs text-grey'>
                        Supports {prediction.user_party} from{' '}
                        {prediction.user_state}
                      </div>
                    )}
                    <div className='text-xs mt-2 text-left'>
                      <div>
                        <span className='mr-3'>
                          Party: {prediction.answer_1}
                        </span>
                        <span>P.M: {prediction.answer_2}</span>
                      </div>
                      <div className='mt-1'>
                        <span className='mr-3'>BJP: {prediction.answer_3}</span>
                        <span className='mr-3'>CNG: {prediction.answer_4}</span>
                        <span>
                          OTH: {543 - prediction.answer_3 - prediction.answer_4}
                        </span>
                      </div>
                    </div>
                    <div className='text-xs text-grey mt-1'>
                      {prediction.minutes_or_hours_ago}
                    </div>
                  </div>
                </div>
                <div className='flex w-1/5 flex-col text-center p-3 bg-grey-lighter justify-center items center'>
                  <span>{prediction.coins_used}</span>
                  <span className='text-xs'>coins</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

PredictionsFeed.propTypes = {
  latestPredictions: PropTypes.array
}
