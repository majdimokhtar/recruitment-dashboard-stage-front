// ** React Imports
import { useEffect } from 'react'

// ** Axios
import { axiosPrivateInstance } from "src/axios";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import useRefreshToken from "src/hooks/useRefreshToken";


export default function useAxiosPrivate() {

    const auth = useAuth()
    const refresh = useRefreshToken()

    useEffect(() => {
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                    config.headers['X-CSRFToken'] = auth.csrfToken
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivateInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
                    auth.setAccessToken(newAccessToken)
                    auth.setCSRFToken(newCSRFToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken
                    return axiosPrivateInstance(prevRequest)
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivateInstance.interceptors.request.eject(requestIntercept)
            axiosPrivateInstance.interceptors.response.eject(responseIntercept)
        }
    }, [auth.accessToken, auth.user])

    return axiosPrivateInstance
}