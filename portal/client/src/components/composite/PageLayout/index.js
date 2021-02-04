import React from 'react'
import PropTypes from 'prop-types'
import PageNavBar from './components/PageNavBar'
import Loader from '../Loader'

const PageContainer = (props) => {
  const {
    children,
    title,
    subtitle,
    isLoading,
    isUnderConstruction,
    iconClassName,
    className,
    hasNoHeader,
    rightHeaderContent,
  } = props

  return (
    <div className={className}>
      <PageNavBar
        hasNoHeader={hasNoHeader}
        iconClassName={iconClassName}
        rightHeaderContent={rightHeaderContent}
        title={title}
        subtitle={subtitle}
      />
      {isLoading && (
        <Loader label="Fetching the data from our servers, hang on tight!" />
      )}
      {!(isLoading || isUnderConstruction) && children}
    </div>
  )
}

PageContainer.defaultProps = {
  isLoading: false,
  isUnderConstruction: false,
  className: '',
  hasNoHeader: false,
  rightHeaderContent: null,
  iconClassName: '',
  subtitle: '',
  title: '',
}

PageContainer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  iconClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  isUnderConstruction: PropTypes.bool, // temp props, it will be removed
  className: PropTypes.string,
  hasNoHeader: PropTypes.bool,
  rightHeaderContent: PropTypes.func,
}

export default PageContainer
