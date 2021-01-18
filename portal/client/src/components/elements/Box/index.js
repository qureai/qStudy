import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Box = (props) => {
  const { children, className } = props
  const boxClassName = classNames('box', {
    [className]: !!className
  })
  return (
    <div className={boxClassName}>
      {children}
    </div>
  )
}

Box.defaultProps = {
  className: null
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Box
