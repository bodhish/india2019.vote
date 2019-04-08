import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as HtmlToImage from 'html-to-image'
import * as Download from 'downloadjs'
export default class Screenshot extends React.Component {
  constructor (props) {
    super(props)
    this.takeAScreenshot = this.takeAScreenshot.bind(this)
  }
  takeAScreenshot (e) {
    e.preventDefault()
    const profile = document.getElementById(this.props.elementID)
    HtmlToImage.toPng(profile)
      .then(function (dataUrl) {
        var img = new Image()
        img.src = dataUrl
        Download(dataUrl, 'screenshot')
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })
  }

  render () {
    return (
      <div className='text-center'>
        <button
          className='text-primary text-xs w-full h-9 cursor-pointer hover:bg-primary-lightest hover:text-primary-dark'
          onClick={this.takeAScreenshot}
        >
          Download Screenshot{' '}
        </button>
      </div>
    )
  }
}

Screenshot.propTypes = {
  elementID: PropTypes.string.isRequired
}
