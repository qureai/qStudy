import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = (props) => {
  const { children, isFluid } = props
  const className = classNames('container', {
    'is-fluid': isFluid,
  })
  return (
    <div className={className}>
      {children}
    </div>
  )
}

Container.defaultProps = {
  isFluid: false,
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  isFluid: PropTypes.bool,
}

export default Container
