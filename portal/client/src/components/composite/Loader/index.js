import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

function Loader({ hasDarkMode, mainLoadingText, subLoadingText }) {
  return (
    <div className={classNames('box has-text-centered loader-wrapper', {
      'dark': hasDarkMode,
    })}>
      <div className="content">
        <div className='loading-spinner'/>
        <h1>
          <div className="title">{mainLoadingText}</div>
          <div className="subtitle">{subLoadingText}</div>
        </h1>
      </div>
    </div>
  )
}

Loader.defaultProps = {
  hasDarkMode: false,
  mainLoadingText: 'Loading',
  subLoadingText: 'Please wait while we prepare the application just for you.',
}

Loader.propTypes = {
  hasDarkMode: PropTypes.bool,
  mainLoadingText: PropTypes.string,
  subLoadingText: PropTypes.string,
}

export default Loader
