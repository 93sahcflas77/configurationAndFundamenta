# ⚡ Axios Auto-Refresh Interceptor — Full Documentation

This file documents the complete **Axios Access Token + Refresh Token auto-renew system**.

---

## 🚀 Purpose
This Axios setup ensures:

- Access tokens are automatically attached to every request  
- Refresh tokens are used silently via HTTP-only cookies  
- Failed requests are queued until token refresh completes  
- Duplicate refresh calls are prevented  
- Tokens are rotated and stored properly  

---

# 🔄 Flow Diagram

```
Request Sent
    │
    ▼
Attach access token? ── Yes → Add Authorization header
    │ No
    ▼
Send request → Backend
    │
    ▼
Is response 401/403?
    │ Yes
    ▼
Is refresh already running?
    │ Yes → Queue request
    │ No
    ▼
Call /refresh
    │
   Success?
    │ Yes → Issue new token → Retry all queued requests
    │ No → Clear token and fail
```

---

# 📄 Full Code

```js
import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
})

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const url = config.url || ''
        const isRefresh =
            url.endsWith('/refresh') ||
            url.includes('/api/refresh') ||
            url.includes('/refresh')

        if (!isRefresh && token) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

/* RESPONSE INTERCEPTOR + QUEUE */
let isRefreshing = false
let refreshQueue = []

const processQueue = (error, token = null) => {
    refreshQueue.forEach((p) =>
        error ? p.reject(error) : p.resolve(token)
    )
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

                const newToken =
                    refreshRes.headers['x-access-token'] ||
                    refreshRes.data?.newToken

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
    }
)

export default api
```

---

# 📘 Usage Example

```js
import api from './api/axios'

const res = await api.get('/dashboard')
console.log(res.data)
```

---

# ✅ Summary

This interceptor provides:

- Auto token rotation  
- Silent refresh  
- Error-free retry mechanism  
- Secure and stable authentication layer  

---

## 📦 File: axiosAutoRefresh.md generated successfully