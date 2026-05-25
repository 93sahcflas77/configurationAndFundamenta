import React from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/userStore'
import { useState } from 'react'

function Forgot() {
    const { forgotPassword, loading, message, error } = useUserStore()
    const [username, setUserName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await forgotPassword(username)

        if (!result.success) {
            navigate(`/reset/${result.token}`)
        }
    }

    return (
        <div className="w-full max-w-md bg-white-900 text-left p-8 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Forgot Password
            </h2>

            <label htmlFor="">
                UserName:{' '}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-400 outline-none"
                />
            </label>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-500 hover:bg-green-600 transition rounded-lg text-white font-bold mt-5"
                onClick={handleSubmit}>
                { loading ? "Loading" : 'Send Reset Token'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    )
}

export default Forgot
