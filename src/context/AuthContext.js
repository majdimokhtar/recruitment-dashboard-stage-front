// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Axios
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  accessToken: null,
  setAccessToken: () => null,
  refreshToken: null,
  setRefreshToken: () => null,
  csrfToken: null,
  setCSRFToken: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  setIsInitialized: () => Boolean
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [accessToken, setAccessToken] = useState(defaultProvider.accessToken)
  const [refreshToken, setRefreshToken] = useState(defaultProvider.refreshToken)
  const [csrfToken, setCSRFToken] = useState(defaultProvider.csrfToken)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)

  // ** AxiosPrivate Instance
  const axiosPrivateInstance = useAxiosPrivate()

  // ** Router
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true)
      if (!accessToken) {
        setLoading(true)
        await axiosPrivateInstance
          .get(authConfig.meEndpoint)
          .then(async response => {
            setLoading(false)
            setUser(response.data.user)
            const path = router.asPath
            const redirectURL = path == '/login/' ? '/dashboards/crm/' : path
            router.push(redirectURL)
          })
          .catch(() => {
            setAccessToken(null)
            setRefreshToken(null)
            setCSRFToken(null)
            setUser(null)
            setLoading(false)
            router.push('/login')
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const values = {
    user,
    accessToken,
    loading,
    setUser,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    csrfToken,
    setCSRFToken,
    setLoading,
    isInitialized,
    setIsInitialized
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
