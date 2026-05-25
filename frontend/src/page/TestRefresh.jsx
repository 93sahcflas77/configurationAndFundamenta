import React from 'react'
import useUserStore from '../store/userStore'
import { useNavigate } from 'react-router-dom'

function TestRefresh() {
    const refreshToken = useUserStore((s) => s.refreshToken)
    const navigate = useNavigate()

    const handleRefresh = async () => {
        await refreshToken()
        navigate('/')
    }
    return (
        <>
            <h2>🔄 Refresh Token Tester</h2>

            <button onClick={handleRefresh}> Refresh Token </button>
        </>
    )
}

export default TestRefresh
