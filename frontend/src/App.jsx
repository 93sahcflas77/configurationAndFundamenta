import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import useUserStore from './store/userStore'
import api from './api/axios'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectAuthenticatedUser from './components/RedirectAuthenticatedUser'
import Home from './page/Home'
import Login from './page/Login'
import Singup from './page/Singup'
import NotFound from './page/NotFound'
import TestRefresh from './page/TestRefresh'
import Forgot from './page/Forgot'
import ForgotToken from './page/ForgotToken'

function App() {
    const getuser = useUserStore((s) => s.getuser)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            getuser() // 🔥 Fetch user BEFORE loading protected routes
        } else {
            useUserStore.setState({ loading: false })
        }
    }, [])
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            // <ProtectedRoute>
                                <Home />
                            // </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/refresh"
                        element={
                            <ProtectedRoute>
                                <TestRefresh />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/forgotPassword"
                        element={<Forgot />}
                    />
                    <Route
                        path="/reset/:token"
                        element={<ForgotToken />}
                    />
                    <Route
                        path="/login"
                        element={
                            <RedirectAuthenticatedUser>
                                <Login />
                            </RedirectAuthenticatedUser>
                        }
                    />
                    <Route
                        path="/signup"
                        element={<Singup />}
                    />
                    <Route
                        path="*"
                        element={
                            <ProtectedRoute>
                                <NotFound />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
