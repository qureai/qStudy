import React, {useState} from 'react';
import Login from "./index";

export default {
  title: 'Composite/Login',
  component: Login,
};

export const SimpleLogin = () => {
  const [isSubmitting, setIsSubmitting] =  useState(false)
  const onSubmit = ()=>{
    setIsSubmitting(true)
    setTimeout(()=>{
      setIsSubmitting(false)
    }, 4000)
  }
  return <Login onSubmit={onSubmit} isLoginInProgress={isSubmitting} logoPath='/qTrackLogo.svg'  />
};

SimpleLogin.story = {
  name: 'Email-password based',
};


export const TranslatedLoginPage = ()=>{
  const labels = {
    signInMessage: 'Iniciar sesión en su cuenta',
    email: 'Correo electrónico',
    password: 'Contraseña',
    submit: 'Iniciar sesión',
    fieldErrorMessages: {
      invalidEmail: 'debe ser un correo electrónico válido',
      minLengthPassword: 'tiene que tener al menos 5 caracteres',
      required: 'Necesario'
    }
  }
  const [errorMessage, setErrorMessage]= useState(null)
  const [isSubmitting, setIsSubmitting] =  useState(false)
  const onSubmit = ()=>{
    setIsSubmitting(true)
    setTimeout(()=>{
      setErrorMessage('correo electrónico o contraseña no válidos') // invalid email or password
      setIsSubmitting(false)
    }, 4000)
  }
  return <Login onSubmit={onSubmit} isLoginInProgress={isSubmitting}
                errorMessage={errorMessage}
                labels={labels}
                logoPath='/qTrackLogo.svg'  />
}


TranslatedLoginPage.story = {
  name: 'Translated login page',
};
