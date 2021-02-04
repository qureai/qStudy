import React from 'react'
import PropTypes from 'prop-types'
import Content from '../../../../elements/Content'
import Icon from '../../../../elements/Icon'
import Level from '../../../../layout/Level'

const PageNavBar = (props) => {
  const {
    iconClassName,
    title,
    subtitle,
    hasNoHeader,
    rightHeaderContent,
  } = props

  if (hasNoHeader) {
    return null
  }

  return (
    <Level>
      <Level.Left>
        <Content>
          <Content.Title>
            <Icon iConClass={iconClassName} />
            <span className="ml-3">{title}</span>
          </Content.Title>
          <Content.Subtitle>{subtitle}</Content.Subtitle>
        </Content>
      </Level.Left>
      {rightHeaderContent && <Level.Right>{rightHeaderContent()}</Level.Right>}
    </Level>
  )
}

PageNavBar.defaultProps = {
  iconClassName: '',
  title: '',
  subtitle: '',
  hasNoHeader: false,
  rightHeaderContent: null,
}

PageNavBar.propTypes = {
  iconClassName: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  hasNoHeader: PropTypes.bool,
  rightHeaderContent: PropTypes.func,
}

export default PageNavBar
