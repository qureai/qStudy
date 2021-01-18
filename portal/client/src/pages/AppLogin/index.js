import React, { useState } from 'react'
import { Login } from '../../components'

const AppLogin = () => {
  const [isSubmitting, setIsSubmitting] =  useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const onSubmit = ()=>{
    setIsSubmitting(true)
    setTimeout(()=>{
      setIsSubmitting(false)
    }, 4000)
  }

  return (
    <Login
      onSubmit={onSubmit}
      isLoginInProgress={isSubmitting}
      errorMessage={errorMessage}
      logoPath='/qTrackLogo.svg'
    />
  )
}

AppLogin.propsTypes = {}

export default AppLogin;