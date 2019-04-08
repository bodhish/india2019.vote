import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import QuestionCard from './questionCard'
import EditProfile from './editProfile'
import { Whatsapp } from 'react-social-sharing'
import { Twitter } from 'react-social-sharing'
import PredictionsFeed from './predictionsFeed'
import Screenshot from './screenshot'
import Logout from './logout'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showForm: false,
      showProfile: false,
      latestPredictions: props.feedStart
    }
    this.coinsLeft = this.coinsLeft.bind(this)
    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.toggleShowProfile = this.toggleShowProfile.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }

  coinsLeft () {
    const arrSum = arr => arr.reduce((a, b) => a + b, 0)
    let coinsUsed = arrSum(
      this.props.predictions.map(prediction => prediction.coinsUsed)
    )
    return 1000 - coinsUsed
  }
  toggleShowProfile (e) {
    e.preventDefault()
    this.updateProfile()
  }

  updateProfile () {
    this.setState({
      showProfile: !this.state.showProfile
    })
  }
  toggleShowForm (e) {
    e.preventDefault()
    this.setState({
      showForm: !this.state.showForm
    })
  }
  render () {
    let facebookShareUrl =
      'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Findia2019.vote&hashtag=%23Inida2019'
    let shareUrl = 'https://india2019.vote'
    let shareMessage =
      "Do you know India's pulse? Make your predictions for the Indian elections 2019 & follow what others are predicting."
    let partyImage = {
      BJP:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/360px-Bharatiya_Janata_Party_logo.svg.png',
      INC:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_the_Indian_National_Congress.svg/500px-Flag_of_the_Indian_National_Congress.svg.png',
      CPI:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/CPI-banner.svg/400px-CPI-banner.svg.png',
      'CPI(M)':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/CPI-M-flag.svg/400px-CPI-M-flag.svg.png',
      BSP:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Elephant_Bahujan_Samaj_Party.svg/400px-Elephant_Bahujan_Samaj_Party.svg.png',
      AITC:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/All_India_Trinamool_Congress_flag.svg/500px-All_India_Trinamool_Congress_flag.svg.png',
      NCP:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_Nationalist_Congress_Party.svg/400px-Flag_of_Nationalist_Congress_Party.svg.png'
    }
    return (
      <div>
        {this.state.showForm ? (
          <div className=''>
            <QuestionCard
              authenticityToken={this.props.authenticityToken}
              coinsLeft={this.coinsLeft()}
              toggleShowFormCB={this.toggleShowForm}
            />
          </div>
        ) : (
          <div className='relative overflow-x-hidden'>
            {this.state.showProfile && this.props.isCurrentUser ? (
              <div className='w-full'>
                <EditProfile
                  authenticityToken={this.props.authenticityToken}
                  closeButton={this.updateProfile}
                  user={this.props.user}
                />
              </div>
            ) : (
              <div className='flex flex-col w-full md:w-2/3 bg-white relative justify-between'>
                <div className='w-full p-4 flex flex-col bg-white items-center'>
                  <div
                    className='flex flex-col max-w-md w-full justify-center items-center text-center'
                    id='profile'
                  >
                    <div className='w-full px-3'>
                      <div className='flex items-center bg-white justify-between p-6 mx-3 shadow rounded-t-xl border border-b-0'>
                        <div className='flex justify-center items-center text-center'>
                          {this.props.user.image && (
                            <img
                              className='w-10 h-10 rounded-full mr-2'
                              src={this.props.user.image.replace(
                                'http://graph.facebook.com/',
                                'https://graph.facebook.com/'
                              )}
                              alt='photo'
                            />
                          )}
                          <div className='flex flex-col text-left'>
                            <div>
                              <p className='leading-none'>
                                {this.props.user.name}
                              </p>
                            </div>
                            <div className='flex mt-1'>
                              {this.props.user.state !== null && (
                                <div className='text-sm text-black'>
                                  {this.props.user.state}
                                </div>
                              )}
                            </div>
                            {this.props.isCurrentUser && (
                              <button
                                onClick={this.toggleShowProfile}
                                className='text-primary text-xs text-left mt-1'
                              >
                                Edit profile
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='isupport-card flex flex-col bg-primary shadow-lg p-8 text-white -mx-3 rounded-xl'>
                        <div className='flex flex-row justify-between items-center text-left px-4'>
                          <div>
                            <div className='text-lg text-white'>I support</div>
                            <div className='text-4xl md:text-5xl text-white'>
                              {this.props.user.party == null
                                ? '_ _ _ '
                                : this.props.user.party}
                            </div>
                            <div className='text-sm md:text-lg pt-6'>
                              #IndiaVote2019
                            </div>
                          </div>
                          <div>
                            <img
                              className='m-2 border-8 border-white rounded-lg party-flag'
                              src={partyImage[this.props.user.party]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col max-w-md w-full mt-10'>
                    <h5 className='uppercase text-xs font-medium text-left pl-2'>
                      Your predictions
                    </h5>
                    {this.props.predictions.map((prediction, index) => (
                      <div
                        key={prediction.id}
                        className='mt-2 flex flex-col max-w-md w-full'
                      >
                        <div className='predicted-list-card w-full text-white p-5 shadow rounded-xl'>
                          <div className='flex items-center justify-between p-2'>
                            <div className='flex justify-center items-center text-center'>
                              <div className='pl-2 text-left text-sm'>
                                <h4 className='font-medium text-sm'>
                                  Prediction {index + 1}{' '}
                                </h4>
                                <p className='pt-4'>
                                  Winning party: {prediction.answer1}
                                </p>
                                <p className='pt-2'>
                                  Prime minister: {prediction.answer2}
                                </p>
                                <p className='pt-2'>
                                  Seat share: BJP -{' '}
                                  <span className='font-semibold'>
                                    {prediction.answer3}
                                  </span>
                                  , Congress -{' '}
                                  <span className='font-semibold'>
                                    {prediction.answer4}
                                  </span>
                                  , Others -{' '}
                                  <span className='font-semibold'>
                                    {543 -
                                      prediction.answer3 -
                                      prediction.answer4}
                                  </span>
                                </p>
                              </div>
                            </div>
                            {this.props.isCurrentUser && (
                              <form
                                className='button_to'
                                method='post'
                                action={'predictions/' + prediction.id}
                              >
                                <input
                                  name='_method'
                                  value='delete'
                                  type='hidden'
                                />
                                <input
                                  className='bg-white rounded text-xs px-3 py-2 hover:bg-grey-lighter cursor-pointer '
                                  value='Delete'
                                  type='submit'
                                />
                                <input
                                  name='authenticity_token'
                                  type='hidden'
                                  value={this.props.authenticityToken}
                                />
                              </form>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='flex flex-col max-w-md w-full mt-10'>
                    <div className='uppercase text-xs font-medium pl-2'>
                      Current Standings
                    </div>
                    <div className='w-full flex flex-col justify-between mt-2'>
                      <div className='current-standings-card'>
                        <div className='pb-3'>
                          <h3 className='font-medium text-primary-darker'>
                            Who will form the government in 2019?
                          </h3>
                        </div>
                        <div className='mt-4 flex flex-end'>
                          <div className='w-full'>
                            <h5 className='font-medium'>NDA</h5>
                            <div className='shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full'>
                              <div
                                className='bg-inv-orange text-xs leading-none rounded-full py-1 text-center text-white'
                                style={{ width: '60%' }}
                              />
                            </div>
                          </div>
                          <h5 className='font-medium pt-3 pl-3'>60%</h5>
                        </div>
                        <div className='mt-4 flex flex-end'>
                          <div className='w-full'>
                            <h5 className='font-medium'>UPA</h5>
                            <div className='shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full'>
                              <div
                                className='bg-inv-blue text-xs leading-none rounded-full py-1 text-center text-white'
                                style={{ width: '30%' }}
                              />
                            </div>
                          </div>
                          <h5 className='font-medium pt-3 pl-3'>30%</h5>
                        </div>
                        <div className='mt-4 flex flex-end'>
                          <div className='w-full'>
                            <h5 className='font-medium'>OTHERS</h5>
                            <div className='shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full'>
                              <div
                                className='bg-inv-yellow text-xs leading-none rounded-full py-1 text-center text-white'
                                style={{ width: '10%' }}
                              />
                            </div>
                          </div>
                          <h5 className='font-medium pt-3 pl-3'>10%</h5>
                        </div>
                      </div>
                      <div className='current-standings-card mt-5'>
                        <div className='pb-3'>
                          <h3 className='font-medium text-primary-darker'>
                            Who will be the prime minister?
                          </h3>
                        </div>
                        <div className='mt-4 flex flex-end'>
                          <div className='w-full'>
                            <h5 className='font-medium'>Rahul Gandhi</h5>
                            <div className='shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full'>
                              <div
                                className='bg-inv-blue text-xs leading-none rounded-full py-1 text-center text-white'
                                style={{ width: '70%' }}
                              />
                            </div>
                          </div>
                          <h5 className='font-medium pt-3 pl-3'>70%</h5>
                        </div>
                        <div className='mt-4 flex flex-end'>
                          <div className='w-full'>
                            <h5 className='font-medium'>Narendra Modi</h5>
                            <div className='shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full'>
                              <div
                                className='bg-inv-orange text-xs leading-none rounded-full py-1 text-center text-white'
                                style={{ width: '20%' }}
                              />
                            </div>
                          </div>
                          <h5 className='font-medium pt-3 pl-3'>20%</h5>
                        </div>
                        <div className='mt-4 flex flex-end'>
                          <div className='w-full'>
                            <h5 className='font-medium'>Others</h5>
                            <div className='shadow-sm w-full bg-grey-lighter mt-1 flex flex-1 rounded-full'>
                              <div
                                className='bg-inv-yellow text-xs leading-none rounded-full py-1 text-center text-white'
                                style={{ width: '10%' }}
                              />
                            </div>
                          </div>
                          <h5 className='font-medium pt-3 pl-3'>10%</h5>
                        </div>
                      </div>
                      <div className='flex flex-col max-w-md w-full mt-10'>
                        <div className='uppercase text-xs font-medium pl-2'>
                          Average seats predicted:
                        </div>
                        <div className='flex'>
                          <div className='my-4 p-3'>
                            <p className='text-sm'>BJP:</p>
                            <h3 className='font-medium mt-2'>
                              {this.props.stats.bjpAvgSeats}
                            </h3>
                          </div>
                          <div className='my-4 p-3'>
                            <p className='text-sm'>Congress:</p>
                            <h3 className='font-medium mt-2'>
                              {this.props.stats.congAvgSeats}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-between'>
                  <a
                    className='m-2 no-underline flex item-center text-center appearance-none bg-blue hover:bg-blue-dark text-white font-bold rounded'
                    href={facebookShareUrl}
                    target='_blank'
                  >
                    <span className='font-regular py-2 px-2'>
                      Share on Facebook
                    </span>
                  </a>
                  <div className='visible sm:invisible'>
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
                <div className='flex items-center mb-24'>
                  <Screenshot elementID='profile' />
                  <Logout authenticityToken={this.props.authenticityToken} />
                </div>
              </div>
            )}
            <div className='notification w-full md:w-1/3 sm:flex sm:flex-col bg-grey-lightest shadow-inner border-l justify-center items-center sm:fixed pin-b pin-t pin-r relative pb-24 sm:pb-0 z-10 px-5'>
              <PredictionsFeed latestPredictions={this.props.feedStart} />
            </div>
          </div>
        )}
        {!this.state.showForm && (
          <div className='w-full md:w-2/3 bg-white fixed pin-b z-20'>
            {this.props.isCurrentUser && (
              <div className='p-2 w-full flex flex-row justify-center items-center border-t'>
                <div className='flex m-4'>
                  <p className='leading-none'>Coins left:&nbsp;</p>
                  <p className='leading-none'>{this.coinsLeft()}</p>
                </div>

                <div className=''>
                  {this.coinsLeft() > 299 && !this.state.showForm && (
                    <button
                      className='p-2 rounded btn text-black'
                      onClick={this.toggleShowForm}
                    >
                      Add New Prediction
                    </button>
                  )}
                </div>
                {this.coinsLeft() < 300 && (
                  <div className='mt-2'>
                    {' '}
                    You dont have enough coins to make a prediction
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
Home.propTypes = {
  user: PropTypes.object,
  authenticityToken: PropTypes.string,
  predictions: PropTypes.array,
  isCurrentUser: PropTypes.bool,
  stats: PropTypes.object,
  feedStart: PropTypes.array
}
