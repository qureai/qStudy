import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Icon = (props) => {
  const {
    iConClass, containerClassName, size, sizeBooster, color, isFixedWidth, hasBorder, isAnimated,
  } = props

  const maapping = {
    'small': '',
    'medium': '2x',
    'large': 'lg',
  }
  const iconContainerClassName = classNames('icon', {
    [`has-text-${color}`]: color,
    [`is-${size}`]: size,
    [containerClassName]: containerClassName,
  })
  const iClassName = classNames('fas', {
    'fa-fw': isFixedWidth,
    'fa-border': hasBorder,
    [`fa-${maapping[size]}`]: size,
    [`fa-${sizeBooster}`]: (size && sizeBooster),
    'fa-spinner': isAnimated,
    [iConClass]: iConClass,
  })
  return (
    <span className={iconContainerClassName}>
        <i className={iClassName}/>
      </span>
  )
}
Icon.defaultProps = {
  containerClassName: null,
  sizeBooster: null,
  size: null,
  color: null,
  isFixedWidth: false,
  hasBorder: false,
  isAnimated: false,
}

Icon.propTypes = {
  iConClass: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  sizeBooster: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  isFixedWidth: PropTypes.bool,
  hasBorder: PropTypes.bool,
  isAnimated: PropTypes.bool,
}

export default Icon
