import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
})

/* ------------------------------------
   REQUEST INTERCEPTOR
------------------------------------- */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')

        // Detect /refresh correctly (Axios rewrites URLs)
        const url = config.url || ''
        const isRefresh = url.endsWith('/refresh') || url.includes('/api/refresh') || url.includes('/refresh')

        if (!isRefresh && token) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${token}`
        } else {
            // console.log('⛔ Skipping Authorization header for refresh route')
        }

        return config
    },
    (error) => Promise.reject(error),
)

/* ------------------------------------
   RESPONSE INTERCEPTOR + REFRESH QUEUE
------------------------------------- */
let isRefreshing = false
let refreshQueue = []

const processQueue = (error, token = null) => {
    refreshQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
    refreshQueue = []
}

api.interceptors.response.use(
    (response) => {
        const headerToken = response.headers['x-access-token']
        if (headerToken) {
            localStorage.setItem('token', headerToken)
            api.defaults.headers.common.Authorization = `Bearer ${headerToken}`
        }
        return response
    },

    async (error) => {
        const original = error.config
        const status = error.response?.status

        if ((status === 401 || status === 403) && !original._retry) {
            original._retry = true

            // If another request is already refreshing, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshQueue.push({
                        resolve: (token) => {
                            original.headers.Authorization = `Bearer ${token}`
                            resolve(api(original))
                        },
                        reject,
                    })
                })
            }

            isRefreshing = true

            try {
                const refreshRes = await api.post('/refresh')

                const newToken = refreshRes.headers['x-access-token'] || refreshRes.data?.newToken

                if (newToken) {
                    localStorage.setItem('token', newToken)
                    api.defaults.headers.common.Authorization = `Bearer ${newToken}`
                }

                processQueue(null, newToken)
                isRefreshing = false

                original.headers.Authorization = `Bearer ${newToken}`
                return api(original)
            } catch (refreshError) {
                processQueue(refreshError, null)
                isRefreshing = false

                localStorage.removeItem('token')
                delete api.defaults.headers.common.Authorization

                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    },
)

export default api
