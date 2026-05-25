import React from 'react'
import useUserStore from '../store/userStore'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { user, isAuthenticated, loading, logout } = useUserStore()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
            <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Home Page
                </h1>

                <h2 className="text-xl font-semibold mb-2">User Info</h2>

                <div className="bg-gray-700 rounded-lg p-4 text-sm overflow-auto max-h-64 border border-gray-600">
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>

                <p className="mt-4 text-gray-300">
                    Authenticated:
                    <span className={`font-bold ml-2 ${isAuthenticated ? "text-green-400" : "text-red-400"}`}>
                        {isAuthenticated ? "YES" : "NO"}</span>
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 transition 
                               text-white font-semibold rounded-lg shadow-lg hover:shadow-xl">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Home
