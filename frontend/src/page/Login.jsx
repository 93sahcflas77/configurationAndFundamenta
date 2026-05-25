import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../store/userStore'

function Login() {
    const { login } = useUserStore()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async () => {
        const sucess = await login(username, password)
        if (!sucess) {
            alert('Login failed')
        } else {
            navigate('/')
        }
    }
    // console.log("login then:-", isAuthenticated)
    return (
        <>
            <div className="w-full max-w-md bg-white-900 text-left p-8 rounded-xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Welcome Back
                </h2>

                {/* <form
                    onSubmit={handleLogin}
                    className="space-y-4"> */}
                <label htmlFor="">
                    UserName:{' '}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-400 outline-none"
                    />
                </label>

                <label htmlFor="">
                    Password:{' '}
                    <input
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-400 outline-none"
                    />
                </label>

                <Link to="/forgotPassword" style={{color: "blue", textDecoration:"underline"}}>Forgot Password</Link>

                {/* {error && (<p className="text-red-500 font-semibold">{error}</p>)} */}

                <button
                    type="submit"
                    className="w-full py-3 bg-green-500 hover:bg-green-600 transition rounded-lg text-white font-bold mt-5"
                    onClick={handleLogin}>
                    Login
                </button>
                {/* </form> */}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Don&apos;t have an account?{''}
                        <Link
                            to="/signup"
                            className="text-green-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
