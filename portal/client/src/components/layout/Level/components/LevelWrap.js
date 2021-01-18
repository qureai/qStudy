import React from 'react'
import PropTypes from 'prop-types'

const LevelWrap = (props) => {
  const { className, children } = props
  return (
    <div className={className}>
      {children}
    </div>
  )
}

LevelWrap.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export default LevelWrap
