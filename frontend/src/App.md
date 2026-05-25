# 🛣️ React Router Authentication Setup — Full Documentation

This document explains the **React Router + Zustand + Axios + Protected Routes** setup used in your authentication system.

Includes:

✔ Flow Diagram  
✔ Full App Code (Routing + Auth Flow)  
✔ Purpose + Summary  
✔ Detailed Usage Notes  
✔ Clean, Production-Ready Formatting  

---

# 🚀 Purpose

This routing system ensures:

- Protected routes are only accessible with a valid token
- User data is fetched before loading protected pages
- Already authenticated users cannot visit the login page
- Smooth navigation with automatic token handling
- Full compatibility with Axios auto-refresh interceptors

---

# 🔄 High-Level Flow Diagram (Routing + Auth)

```
 ┌───────────────────────────────┐
 │            App load            │
 └───────────────┬───────────────┘
                 ▼
     Read token from localStorage
                 │
         Token exists?
         │ Yes                        │ No
         ▼                            ▼
 Set Axios Authorization header     Mark loading=false
 Call getuser() to fetch profile    (Unauthenticated)
                 │
                 ▼
      User authenticated?
         │ Yes                 │ No
         ▼                     ▼
 ProtectedRoute → allow        ProtectedRoute → redirect to /login
```

---

# 📄 Full Code

```jsx
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
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
```

---

# 🧩 Explanation of Key Parts

### 🔹 **Token Initialization**
When the app loads, it checks localStorage for a token.

```js
const token = localStorage.getItem('token')
```

If it exists:

- The Axios header is set
- `getuser()` runs to confirm if the token is valid
- Prevents flashing of protected screens during load

---

### 🔹 **ProtectedRoute**
Allows access **only if authenticated**, otherwise redirects to `/login`.

Used for:

- `/`
- `/refresh`
- `*` (wildcard)

---

### 🔹 **RedirectAuthenticatedUser**
Prevents logged-in users from visiting:

- `/login`

Redirects them to `/`.

---

# 📘 Usage Example

### ✔ Adding a new protected page

```jsx
<Route
    path="/settings"
    element={
        <ProtectedRoute>
            <Settings />
        </ProtectedRoute>
    }
/>
```

### ✔ Adding a public page

```jsx
<Route path="/pricing" element={<Pricing />} />
```

---

# 🔐 Routing Behaviour Summary

| Route | Access | Behavior |
|-------|--------|----------|
| `/` | Protected | Shows Home if authenticated |
| `/login` | Public | Redirects to `/` if already logged in |
| `/signup` | Public | Always accessible |
| `/refresh` | Protected | Used for debugging refresh logic |
| `*` | Protected | Shows NotFound for authenticated users |

---

# ✅ Summary

This React routing setup provides:

- Clean authentication flow  
- Faster load time using token pre-validation  
- Bulletproof protected routes  
- Full integration with Axios auto-refresh + Zustand store  

---

## 📦 File: reactRouterAuth.md generated successfully