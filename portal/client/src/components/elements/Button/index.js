import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Button(props) {
  const {
    type,
    onClick,
    isPrimary,
    isSecondary,
    isOutlined,
    isLink,
    isText,
    isLight,
    isLoading,
    isStatic,
    isDisabled,
    isDelete,
    isFullWidth,
    size,
    placeholder,
    className,
    children,
  } = props

  let buttonClassName = ''
  if (!isDelete) {
    buttonClassName = classNames('button', {
      'is-primary': isPrimary || isSecondary,
      'is-link': isLink,
      'is-text': isText,
      'is-light': isLight,
      'is-outlined': isOutlined || isSecondary,
      'is-loading': isLoading,
      'is-static': isStatic,
      'is-fullwidth': isFullWidth,
      [`is-${size}`]: size,
      [className]: className,
    })
  } else {
    // special case for delete button icon
    buttonClassName = 'delete'
  }


  // This eslint-disable is intentional to avoid the linting error
  //  and also type prop is marked required
  /* eslint-disable */
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClassName}
      placeholder={placeholder}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
  /* eslint-enable */
}

Button.defaultProps = {
  placeholder: '',
  className: '',
  size: 'normal',
  isDisabled: false,
  isPrimary: false,
  isSecondary: false,
  isOutlined: false,
  isLight: false,
  isStatic: false,
  isLoading: false,
  isDelete: false,
  isText: false,
  isLink: false,
  isFullWidth: false,
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isPrimary: PropTypes.bool,
  isSecondary: PropTypes.bool,
  isOutlined: PropTypes.bool,
  isLight: PropTypes.bool,
  isStatic: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDelete: PropTypes.bool,
  size: PropTypes.string, // small, medium, large
  isText: PropTypes.bool,
  isLink: PropTypes.bool,
  isFullWidth: PropTypes.bool,
}

export default Button
