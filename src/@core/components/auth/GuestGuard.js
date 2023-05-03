// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'

// ** Config
import authConfig from 'src/configs/auth'

const GuestGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  const axiosPrivateInstance = useAxiosPrivate()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    const checkAuthentication = async() => {
      try {
        await axiosPrivateInstance.get(authConfig.meEndpoint)
        .then(() => {
          router.replace('/')
        })
      } catch (err) {
        console.log('guest error :: ',err)
      }
    } 
    checkAuthentication()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
