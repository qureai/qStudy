import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Column from './components/Column'

const Columns = (props) => {
  const { children, size, isGapless, isMultiline, isCentered, isVerticalCentered, isFullHeight } = props
  const className = classNames('columns', {
    [`is-${size}`]: size,
    'is-gapless': isGapless,
    'is-multiline': isMultiline,
    'is-centered': isCentered,
    'is-vcentered': isVerticalCentered,
  })

  const stylez = {}

  if(isFullHeight) {
    stylez.height = "100%"
  }

  return (
    <div className={className} style={stylez}>
      {children}
    </div>
  )
}

Columns.Column = Column

Columns.defaultProps = {
  size: null,
  isGapless: false,
  isMultiline: false,
  isCentered: false,
  isVerticalCentered: false,
  isFullHeight: false,
}

Columns.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string, // mobile, tablet, desktop
  isGapless: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isCentered: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  isVerticalCentered: PropTypes.bool,
}

export default Columns
