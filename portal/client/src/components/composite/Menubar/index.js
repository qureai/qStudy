import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import Icon from '../../elements/Icon';

const Menubar = (props) => {
  const [isVisible, setVisible] = useState(false);
  const { onLogout } = props;

  const onToggleMenu = () => {
    setVisible(!isVisible);
  }

  return (
    <nav
      className="navbar is-primary mb-5"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item logo-wrapper" to="/">
          <img src="/icons/qure-192x192blue.png" width="36" height="30" alt="Qure Logo" />
        </Link>
        {/* eslint-disable */}
        <a
          onClick={onToggleMenu}
          onKeyDown={onToggleMenu}
          className={classNames({
            'is-active': isVisible,
          })}
          aria-label="menu"
          aria-expanded="true"
          data-target="qureNavbar"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
        {/* eslint-enabled */}
      </div>

      <div
        id="qureNavbar"
        className={classNames('navbar-menu', { 'is-active': isVisible })}
      >
        <div className="navbar-start">
          <NavLink
            to="/login"
            exact
            className="navbar-item"
            activeClassName="is-active"
            onClick={onLogout}
          >
            <Icon iConClass="fa-sign-out-alt" />
            <span>{'Logout'}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

Menubar.defaultProps = {}

Menubar.propTypes = {}

export default Menubar
