import React from 'react'
import PropTypes from 'prop-types'
export default class Logout extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='button'>
        <form className='button_to' method='post' action='/users/sign_out'>
          <input name='_method' value='delete' type='hidden' />
          <input
            name='authenticity_token'
            type='hidden'
            value={this.props.authenticityToken}
          />
          <div className='flex items-center justify-center'>
            <button
              className='bg-white hover:bg-grey-lighter text-xs text-grey-dark py-2 px-4 rounded focus:outline-none'
              type='submit'
              value='Submit'
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Logout.propTypes = {
  authenticityToken: PropTypes.string
}
