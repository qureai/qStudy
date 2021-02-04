import React from 'react'
import PropTypes from 'prop-types'

const ContentWrap = (props) => {
  const { children, className } = props
  return (
    <div className={className}>
      {children}
    </div>
  )
}

ContentWrap.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export default ContentWrap
