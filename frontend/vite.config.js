import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const validateEnv = (envMode, env) => {
    const requiredVars = ['PORT', 'VITE_ENV', 'BACKEND_PROXY']

    for (const key of requiredVars) {
        if (!env[key]) {
            throw new Error(`${key} is missing! Please define it in your .env.${envMode}`)
        }
    }
}

const normalizePath = (port) => {
    const normalizePort = parseInt(port)
    if (isNaN(normalizePort)) {
        throw new Error(`Invalid port value: ${port}`)
    }

    return normalizePort
}

export default defineConfig(({ mode }) => {
    // if (mode !== 'development' && mode !== 'production') {
    //     throw new Error(`Invalid mode: ${mode}`)
    // }
    const envMode = mode

    const env = loadEnv(envMode, process.cwd(), '')

    validateEnv(envMode, env)

    const port = normalizePath(env.PORT)

    const config = {
        port,
        open: true,
        proxy: {
            '/api': {
                target: env.BACKEND_PROXY,
                changeOrigin: true,
                secure: false
            },
        },
    }
    return {
        plugins: [react(), tailwindcss()],
        server: config,
        build: {
            minify: true,
        },
    }
})
