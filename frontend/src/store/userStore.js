import { create } from 'zustand'
import api from '../api/axios'

const useUserStore = create((set) => ({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
    refreshResult: null,
    message: null,
    resetToken: null,

    restier: async (email, password, role) => {
        set({ loading: true })
        try {
            const res = await api.post('/auth/register', { email, password, role })
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

    login: async (email, password) => {
        set({ loading: true })
        try {
            const res = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
            // const userRes = await api.get('/profile')
            // set({ user: userRes.data, isAuthenticated: true, loading: false })
            return true
        } catch (err) {
            set({ error: err.message, loading: false })
        }
    },

    getuser: async () => {
        try {
            const res = await api.get('/auth/dashbord')
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

    forgotPassword: async (username) => {
        set({ loading: true, error: null, message: null })
        try {
            const res = await api.post('/forgot-password', { username })
            set({ loading: false, message: res.data.message, resetToken: res.data.resetToken })
            return { succes: true, token: res.data.resetToken }
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    resetPassword: async (token, password) => {
        set({ loading: true, error: null, message: null })
        try {
            const res = await api.post(`/reset-password/${token}`, { password })
            set({ loading: false, message: res.data.message })
            return { succes: true }
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },
}))

export default useUserStore
