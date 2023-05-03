import axios from 'axios'

//import { useAuth } from 'src/hooks/useAuth'

const API_URL = "http://127.0.0.1:8000/api/"

export const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

// Another axios instance for authorization required requests
export const axiosPrivateInstance = axios.create({
        baseURL: API_URL,
        timeout: 5000,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
})

// Another axios instance for GOOGLE login
/*export const googleLogin = (accesstoken) => {
    axios.post('http://localhost:8000/auth/convert-token/', {
        token: accesstoken,
        backend: 'google-oauth2',
        grant_type: 'convert_token',
        client_id: '293086704954-4jtjnose54udgnb7d4c4ib6oumm2gltr.apps.googleusercontent.com',
        client_secret: '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',
    })
    .then(res => {
        const auth = useAuth()
        console.log('access_axios :>> ',res.data.access_token)
        console.log('refresh_axios :>> ',res.data.refresh_token)
        auth.setAccessToken(res.data.access_token)
        auth.setRefreshToken(res.data.refresh_token)
    })
}*/