import React, { useState } from 'react';
import { Login } from '../../components';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import loginService from './services';

const AppLogin = () => {
  const [isSubmitting, setIsSubmitting] =  useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  
  const onLoginSubmit = (data) => {
    setIsSubmitting(true);
    setErrorMessage('');

    loginService(data)
      .then((response) => {
        history.push('/');
        setIsSubmitting(false);
      })
      .catch((err) => {
        const status = _.get(err, 'status');

        if(status === 400) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("Error on login, please try again later");
        }

        setIsSubmitting(false);
      });
  };

  return (
    <Login
      onSubmit={onLoginSubmit}
      isLoginInProgress={isSubmitting}
      containerClassname="login-wrapper"
      errorMessage={errorMessage}
      logoPath='/qTrackLogo.svg'
    />
  );
}

AppLogin.propsTypes = {};

export default AppLogin;