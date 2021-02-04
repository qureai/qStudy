import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ContentWrap from './components/ContentWrap'

const Content = (props) => {
  const { children, size, className } = props
  const contentClassName = classNames('content', {
    [`is-${size}`]: size,
    [className] : !!className,
  })
  return (
    <div className={contentClassName}>
      {children}
    </div>
  )
}

Content.defaultProps = {
  size: null,
  className: null,
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  className: PropTypes.string
}

Content.Title = (props) => {
  const { children } = props
  return (<ContentWrap className='title'>{children}</ContentWrap>)
}

Content.Title.propTypes = {
  children: PropTypes.node.isRequired,
}

Content.Subtitle = (props) => {
  const { children } = props
  return (<ContentWrap className='subtitle'>{children}</ContentWrap>)
}

Content.Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Content
