import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Card = ({ contentOnly, children, className, CardTitle, cardTitleClassName, Footer, onClick }) => {
  // TODO: temp setback with eslint, but later needed to be fixed
  return (
    /* eslint-disable */
    <div className={classNames('card', { [className]: className })}
         onClick={onClick}>
      {/* eslint-enabled */}
      {!contentOnly && <div className={classNames('card-header', {
        [cardTitleClassName] : cardTitleClassName
      })}>
        <div className="card-header-title has-text-centered">
          <CardTitle/>
        </div>
      </div>}
      <div className="card-content">
        {children}
      </div>
      {Footer && <footer className="card-footer">
        <Footer/>
      </footer>}
    </div>
  )
}

Card.defaultProps = {
  contentOnly: false,
  className: '',
  CardTitle: null,
  Footer: null,
  cardTitleClassName: '',
  onClick: ()=>null
}

Card.propTypes = {
  /**
   * Whatever you pass as the children will be rendered in the Card content
   * */
  children: PropTypes.node.isRequired,
  /**
   * Use this if you card with only content and no card header
   * */
  contentOnly: PropTypes.bool,
  /**
   * Top card classname
   */
  className:PropTypes.string,
  /**
   *
   */
  CardTitle: PropTypes.func,
  Footer: PropTypes.func,
  cardTitleClassName: PropTypes.string,
  onClick: PropTypes.func
}

export default Card
