import { useEffect, useState } from 'react'
import _ from 'lodash'
import UIStore from 'states/userProfile'
import serviceConnect from '../axios-connect'

function getUserDataService() {
  return serviceConnect.get('/profile/').then(({ data }) => data)
}

function getSitesMap(sites) {
  if (_.isEmpty(sites)) {
    return {}
  }

  return sites.reduce((acc, siteObj) => {
    acc[siteObj.name] = siteObj
    return acc
  }, {})
}

function useHomeData() {
  const [authData, setAuthData] = useState(null)

  useEffect(() => {
    getUserDataService()
      .then((data) => {
        UIStore.update((s) => {
          // TODO: to be removed once BE is ready
          // eslint-disable-next-line no-param-reassign
          s.userProfile = data
          // eslint-disable-next-line no-param-reassign
          s.siteMap = getSitesMap(data.sites)
        })
      })
      .catch((err) => {
        setAuthData(err)
      })
  }, [])

  return authData
}

function useProfileData() {
  const [authData, setAuthData] = useState(null)

  useEffect(() => {
    getUserDataService()
      .then((data) => {
        setAuthData(data)
      })
      .catch((err) => {
        setAuthData(err)
      })
  }, [])

  return authData
}

export { useHomeData as default, getUserDataService, useProfileData }
