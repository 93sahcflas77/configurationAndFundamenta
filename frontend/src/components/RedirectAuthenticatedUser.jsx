import React from 'react'
import useUserStore from '../store/userStore'
import { Navigate } from 'react-router-dom'

function RedirectAuthenticatedUser({ children }) {
    const { isAuthenticated, loading } = useUserStore()
    if (loading) return <div>Loading...</div>

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children
}

export default RedirectAuthenticatedUser
