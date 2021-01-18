import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import LevelWrap from './components/LevelWrap'

const Level = (props) => {
  const { children, className, isMobile } = props
  const classes = classNames('level', {
    'is-mobile': isMobile,
    [className]: className
  })
  return (
    <LevelWrap className={classes}>
      {children}
    </LevelWrap>
  )
}

Level.defaultProps = {
  className: '',
  isMobile: false
}

Level.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isMobile: PropTypes.bool,
}

Level.Left = (props) => {
  const { children, className } = props
  const classes = classNames('level-left', {
    [className]: className
  })
  return (
    <LevelWrap className={classes}>
      {children}
    </LevelWrap>
  )
}

Level.Left.defaultProps = {
  className: ''
}

Level.Left.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Level.Right = (props) => {
  const { children, className } = props
  const classes = classNames('level-right', {
    [className]: className
  })
  return (
    <LevelWrap className={classes}>
      {children}
    </LevelWrap>
  )
}

Level.Right.defaultProps = {
  className: ''
}

Level.Right.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Level.Item = (props) => {
  const { children, hasTextCentered, className } = props
  const classes = classNames('level-item', {
    'has-text-centered': hasTextCentered,
    [className]: className
  })
  return (
    <LevelWrap className={classes}>
      {children}
    </LevelWrap>
  )
}

Level.Item.defaultProps = {
  hasTextCentered: false,
  className: ''
}

Level.Item.propTypes = {
  children: PropTypes.node.isRequired,
  hasTextCentered: PropTypes.bool,
  className: PropTypes.string
}

export default Level
