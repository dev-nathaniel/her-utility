import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { router } from 'expo-router'

const api = axios.create({
    // baseURL: 'https://her-utility-server1.pxxl.click/api'
    baseURL: 'https://her-utility.nw.r.appspot.com/api'
    // baseURL: 'https://her-utility-server.onrender.com/api'
})

let isRefreshing = false
let refreshSubscribers: any = []

const subscribeTokenRefresh = (cb: (params: any)=>void) => {
    refreshSubscribers.push(cb)
}

const onRefreshed = (newToken: string) => {
    refreshSubscribers.forEach((cb: any) => cb(newToken))
    refreshSubscribers = []
}

const isAuthRequest = (url: string | undefined) => url?.includes("/auth")

// attach token to every request if there is token
// we need to refresh token on fail as well
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token')
    if (!isAuthRequest(config.url) && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//handle 401 errors (token expired)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        //skip refresh token logic for auth endpoints
        if (isAuthRequest(originalRequest.url)) {
            return Promise.reject(error)
        }

        //if token expired and not already refreshing
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true
                try {
                    const refreshToken = await AsyncStorage.getItem("refreshToken")
                    const { data } = await axios.post("/auth/refresh-token", { refreshToken })

                    await AsyncStorage.setItem("token", data.token)
                    isRefreshing = false
                    onRefreshed(data.token)
                } catch (refreshError) {
                    isRefreshing = false
                    // if refresh fails -> logout user
                    await AsyncStorage.removeItem("token")
                    await AsyncStorage.removeItem("refreshToken")
                    router.replace('/(auth)/login')
                    return Promise.reject(refreshError)
                }
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh((newToken: string) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    resolve(api(originalRequest))
                })
            })
        }

        return Promise.reject(error)
    }
)

export default api