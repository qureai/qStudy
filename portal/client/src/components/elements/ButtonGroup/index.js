import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ButtonGroup = (props)=>{
  const {hasAddons, children, isRight, isCentered, className} = props
  const containerClassName = classNames('buttons', {
    'has-addons': hasAddons,
    'is-centered' : isCentered,
    'is-right': isRight,
    [className] : !!className,
  })
  return (
    <div className={containerClassName}>
      {children}
    </div>
  )
}

ButtonGroup.defaultProps = {
  hasAddons: false,
  isCentered: false,
  isRight: false,
  className: '',
}

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  hasAddons: PropTypes.bool,
  isCentered: PropTypes.bool,
  isRight: PropTypes.bool,
  className: PropTypes.string,
}

export default ButtonGroup
