import axios from "axios"
import useJwt from '../@core/auth/jwt/useJwt'

const api = axios.create({
    baseURL: "https://damp-bastion-51123.herokuapp.com"
})

api.interceptors.request.use(async config => {
    const token = useJwt().jwt.getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api