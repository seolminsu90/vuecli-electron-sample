import { useAuthStore } from '../store'
import axios from 'axios'

export const useAxios = (host) => {
    const API_HOST = host
    const store = useAuthStore()

    let options = {
        baseURL: '',
        timeout: 60000,
        withCredentials: true,
        headers: {
            //'Access-Control-Allow-Origin': '*',
            //'X-Default-Header': 'Hello world'
        }
    }

    options.baseURL = API_HOST

    const Axios = axios.create(options)

    Axios.interceptors.request.use(
        (config) => {
            if (!config.skipAuthorization) {
                const authorization = !config.headers['Authorization']
                    ? store.getToken.access
                    : config.headers['Authorization']
                const authorizationType = !config.headers['AuthorizationType']
                    ? 'Bearer'
                    : config.headers['AuthorizationType']
                if (authorization)
                    config.headers['Authorization'] = `${authorizationType} ${authorization}`
            }

            return config
        },
        (error) => Promise.reject(error)
    )

    Axios.interceptors.response.use(
        async (response) => response,
        async (error) => Promise.reject(error)
    )

    return Axios
}
