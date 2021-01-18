import { useEffect, useState } from 'react'
import serviceConnect from '../axios-connect'

function authService() {
  return serviceConnect.get('/auth/').then(({ data }) => data)
}

function useAuthenticate() {
  const [isUserAuthorized, serUserAuthorized] = useState(false)

  useEffect(() => {
    authService()
      .then(() => {
        serUserAuthorized(true)
      })
      .catch(() => {
        serUserAuthorized(true)
      })
  }, [])

  return { isUserAuthorized }
}

export default useAuthenticate
