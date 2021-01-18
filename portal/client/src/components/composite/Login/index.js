import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '../../elements/Button'

import './index.scss'
import useFormObject from './formikBindings'
import FieldMessage from '../../elements/FieldMessage'

const defaultLabels = {
  signInMessage: 'Sign in to your account',
  email: 'Email',
  password: 'Password',
  submit: 'Login',
  fieldErrorMessages: {
    invalidEmail: 'must be a valid email',
    minLengthPassword: 'must be at least 5 characters',
    required: 'Required',
  },
}

// Email-password login component
function Login(props) {
  const {
    onSubmit,
    logoPath,
    containerClassname,
    isLoginInProgress,
    errorMessage,
    labels: labelsProps,
  } = props

  const emailInput = useRef(null)

  const labels = { ...defaultLabels, ...labelsProps }

  const formObject = useFormObject(labels, (values) => {
    const { email, password } = values
    onSubmit({ email, password })
  })

  useEffect(() => {
    setTimeout(() => {
      emailInput.current.focus()
    }, 1000)
  }, [])


  // TODO: for following handle the validations and error conditions whenever cannot login
  // function onHandleKeyDown(e) {
  //   if (e.key === 'Enter' && email && password) {
  //     onFormSubmit()
  //   }
  // }

  const containerClass = classNames({
    [containerClassname]: !!containerClassname,
  })

  const buttonClassName = classNames('button is-primary is-fullwidth', {
    'is-loading': isLoginInProgress,
  })

  return (
    <div className='app-login-wrapper'>
      <div className="login-top-div" />
      <form className={containerClass} onSubmit={formObject.handleSubmit}>
        <div className="box">
          <figure className="image logo-figure">
            <img src={logoPath} className="qure-logo" alt="Qure logo" />
          </figure>
          <div className="content">
            <h6 className='has-text-grey-dark has-text-centered'>{labels.signInMessage}</h6>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              {labels.email}
            </label>
            <div className="control has-icons-left">
              <span className="icon is-small is-left"><i className="fas fa-envelope" /></span>
              {/* eslint-disable */}
              <input
                className="input"
                ref={emailInput}
                placeholder="john@example.org"
                {...formObject.getFieldProps('email')}
              />
              { /* eslint-enable */}
            </div>
            <FieldMessage formObject={formObject} fieldName="email" />
          </div>
          <div className="field">
            <label className="label" htmlFor="password">
              {labels.password}
            </label>
            <div className="control  has-icons-left">
              <span className="icon is-small is-left"><i className="fas fa-lock" /></span>
              {/* eslint-disable */}
              <input
                type="password"
                id="password"
                className="input"
                placeholder="*****"
                {...formObject.getFieldProps('password')}
              />
              { /* eslint-enable */}
            </div>
            <FieldMessage formObject={formObject} fieldName="password" />
          </div>
          {errorMessage && (
            <div className="field">
              <div className="has-text-danger">{errorMessage}</div>
            </div>
          )}
          <div className="field">
            <div className="control">
              <Button
                type="submit"
                onClick={() => null}
                className={buttonClassName}
              >
                {labels.submit}
              </Button>
            </div>
          </div>
          {/* <div className="content content has-text-centered"> */}
          {/*  <Button className='' isText onClick={() => null}>forgot your password?</Button> */}
          {/* </div> */}
        </div>
      </form>
    </div>

  )
}

Login.defaultProps = {
  containerClassname: 'login-wrapper',
  isLoginInProgress: false,
  errorMessage: '',
  labels: defaultLabels,
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  logoPath: PropTypes.string.isRequired,
  containerClassname: PropTypes.string,
  isLoginInProgress: PropTypes.bool,
  errorMessage: PropTypes.string,
  labels: PropTypes.shape({
    signInMessage: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    submit: PropTypes.string,
    fieldErrorMessages: {
      required: PropTypes.string,
      invalidEmail: PropTypes.string,
      minLengthPassword: PropTypes.string,
    },
  }),
}

export default Login
