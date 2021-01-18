import { useEffect, useState } from 'react'
import _ from 'lodash'
import UIStore from 'states/userProfile'

function useGlobalSiteSubscribe(selectedSiteObj) {
  const [siteName, setSiteName] = useState(_.get(selectedSiteObj, ['label']))

  useEffect(() => {
    const unsubscribeFromStore = UIStore.subscribe(
      s => s.selectedSite,
      newSelectedSiteObj => {
        setSiteName(_.get(newSelectedSiteObj, ['label']))
      }
    )
    return () => {
      unsubscribeFromStore()
    }
  }, [])

  return siteName
}

export default useGlobalSiteSubscribe
