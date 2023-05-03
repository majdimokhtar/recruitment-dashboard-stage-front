// ** Axios
import { axiosInstance } from "src/axios";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";

// ** Config
import authConfig from 'src/configs/auth'


export default function useRefreshToken() {

    const auth = useAuth()

    const refresh = async () => {
        const response = await axiosInstance.post(authConfig.refreshTokenEndpoint)

        return { accessToken: response.data.access, csrfToken: response.headers["x-csrftoken"] }
    }

    return refresh
}