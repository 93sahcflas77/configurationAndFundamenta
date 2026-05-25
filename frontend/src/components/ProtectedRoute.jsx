import React from 'react'
import { Navigate } from 'react-router-dom'
import useUserStore from '../store/userStore'

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useUserStore()
    if (loading) return <div>Loading...</div>

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
