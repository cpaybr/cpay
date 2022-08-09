import axios from "axios"
import StringUtils from "../utility/string/StringUtils"

const authKey = StringUtils.toBase64(`${process.env.REACT_APP_FIT_USER}:${process.env.REACT_APP_FIT_PASSWORD}`)

const defApi = axios.create({
    baseURL: "https://sandboxapi.fitbank.com.br/main/execute"
})

defApi.interceptors.request.use(async config => {
    config.headers.Authorization = `Basic ${authKey}`
    return config
})

export default defApi