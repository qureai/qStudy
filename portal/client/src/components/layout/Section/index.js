import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Section = (props) => {
  const { children, className, isFullWidth, isFullHeight } = props
  const stylez = {}

  if (isFullWidth) {
    stylez.width = '100%'
  }

  if (isFullHeight) {
    stylez.height = '100%'
  }

  const sectionClassName = classNames('section', {
    [className]: className,
  })

  return (
    <section className={sectionClassName} style={stylez}>
      {children}
    </section>
  )
}

Section.defaultProps = {
  className: null,
  isFullHeight: false,
  isFullWidth: false,
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isFullWidth: PropTypes.bool,
  isFullHeight: PropTypes.bool,
}

export default Section
