import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Column = (props) => {
  const { children, size, offset, isNarrow, className } = props
  const columnClass = classNames('column', {
    [`is-${size}`]: size,
    [`is-offset-${offset}`]: offset,
    'is-narrow': isNarrow,
    [className]: className,
  })
  return (
    <div className={columnClass}>
      {children}
    </div>
  )
}

Column.defaultProps = {
  className: null,
  size: null,
  offset: null,
  isNarrow: false,
}

Column.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  offset: PropTypes.string,
  isNarrow: PropTypes.bool,
}

export default Column
