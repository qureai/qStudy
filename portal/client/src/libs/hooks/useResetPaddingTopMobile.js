import { useEffect } from 'react'

function useResetPaddingTopMobile(isDesktop) {
  useEffect(() => {
    if (!isDesktop) {
      document.body.classList.add('padding-top-zero')
    }
    return () => {
      document.body.classList.remove('padding-top-zero')
    }
  }, [isDesktop])

  return null
}

export default useResetPaddingTopMobile
