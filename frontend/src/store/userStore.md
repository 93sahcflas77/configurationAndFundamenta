# 🧩 Zustand Authentication Store — Full Documentation

This document provides a **complete explanation** of the Zustand auth store, including:

✔ Flow Diagram  
✔ Full Store Code  
✔ Purpose + Summary  
✔ Usage Examples  
✔ Clean, Production-Ready Formatting  

---

# 🚀 Purpose

This Zustand store centralizes the entire authentication workflow:

- Register new users  
- Login users and fetch profile data  
- Manage access tokens with Axios  
- Support refresh token flow  
- Track global user/auth/loading/error state  
- Handle logout cleanly  

This architecture integrates seamlessly with your **Axios auto-refresh system**.

---

# 🔄 High-Level Flow Diagram (Frontend Authentication Logic)

```
 ┌────────────────────────────────────┐
 │            User Action             │
 └───────────────────┬────────────────┘
                     ▼
        Register / Login / Get Profile
                     │
                     ▼
     ┌────────────────────────────────┐
     │ Zustand calls API via Axios    │
     │                                │
     │ Login → save token → set auth  │
     │ Profile → validate token       │
     │ Refresh → auto token rotation  │
     └───────────────────┬────────────┘
                         ▼
         Update Zustand global state
                     │
                     ▼
           UI Reactively Updates
```

---

# 📄 Full Store Code

```js
import { create } from 'zustand'
import api from '../api/axios'

const useUserStore = create((set) => ({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
    refreshResult: null,

    restier: async (username, password, role) => {
        set({ loading: true })
        try {
            const res = await api.post('/restier', { username, password, role })
            if (!res.data) {
                set({ loading: false, error: res.data.message })
                return false
            }

            set({ loading: false, error: null })
            return true
        } catch (error) {
            set({ error: error.message, loading: false })
            return false
        }
    },

    login: async (username, password) => {
        set({ loading: true })
        try {
            const res = await api.post('/login', { username, password })
            localStorage.setItem('token', res.data.token)
            api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
            const userRes = await api.get('/profile')
            set({ user: userRes.data, isAuthenticated: true, loading: false })
            return true
        } catch (err) {
            set({ error: err.message, loading: false })
        }
    },

    getuser: async () => {
        try {
            const res = await api.get('/profile')
            set({ user: res.data, isAuthenticated: true, loading: false, error: null })
        } catch (err) {
            set({ error: err.message, loading: false, isAuthenticated: false })
        }
    },

    refreshToken: async () => {
        set({ loading: true })
        try {
            const res = await api.post('/refresh')
            if (res.data.newToken) {
                localStorage.setItem('token', res.data.newToken)
                api.defaults.headers.common.Authorization = `Bearer ${res.data.newToken}`
            }
            set({ refreshResult: res.data, loading: false, error: null })
            return true
        } catch (err) {
            set({ error: err.message, loading: false })
        }
    },

    logout: async () => {
        try {
            await api.post('/logout')

            // 👉 REMOVE TOKEN FROM AXIOS DEFAULT HEADER
            delete api.defaults.headers.common.Authorization

            // 👉 REMOVE FROM LOCALSTORAGE
            localStorage.removeItem('token')

            set({ user: null, isAuthenticated: false, error: null })
        } catch (err) {
            set({ error: err.message, loading: false })
        }
    },
}))

export default useUserStore
```

---

# 📘 Usage Examples

### ✔ Register a User

```js
const success = await useUserStore.getState().restier("john", "123456", "user")
```

### ✔ Login a User

```js
const success = await useUserStore.getState().login(username, password)
```

### ✔ Auto-fetch user on page load

```js
useEffect(() => {
    useUserStore.getState().getuser()
}, [])
```

### ✔ Logout User

```js
useUserStore.getState().logout()
```

---

# 🔐 State Breakdown

| Key | Meaning |
|------|---------|
| **user** | Logged-in user's profile |
| **loading** | UI loading state |
| **error** | Error messages stored here |
| **isAuthenticated** | Whether token + profile are valid |
| **refreshResult** | Stores result of refresh API |

---

# ✅ Summary

This Zustand store provides:

- Centralized authentication  
- Complete token lifecycle support  
- Automatic Axios + token integration  
- Smooth UI reactivity  

---

## 📦 File: zustandAuthStore.md generated successfully