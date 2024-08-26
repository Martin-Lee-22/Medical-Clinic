import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true //Allows to send cookies with our request. This will send the refresh token that is in our cookie.
        });
        {/* @ts-ignore */}
        setAuth(prev => { 
            return {...prev, accessToken: response.data.accessToken}
        }); 
        return response.data.accessToken
    }
    return refresh;
}

export default useRefreshToken