import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    {/* Glowing Circle Background */}
                    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                        <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/30 blur-3xl" />
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-red-300">
                        <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.7)]" />
                        Error 404
                    </div>

                    {/* Big 404 */}
                    <div className="relative mb-6">
                        <h1 className="text-7xl font-black tracking-tight text-slate-100 md:text-8xl">
                            404
                        </h1>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                            Page not found
                        </p>
                    </div>

                    {/* Message */}
                    <p className="max-w-xl text-sm md:text-base text-slate-300">
                        Oops! The page you’re trying to open doesn’t exist, was moved, or
                        the URL is typed incorrectly. Don’t worry — you can go back home
                        or continue exploring the app.
                    </p>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center rounded-xl border border-indigo-500 bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 hover:shadow-indigo-400/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            ← Back to Home
                        </Link>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-2.5 text-sm font-medium text-slate-200 shadow-sm transition hover:border-slate-500 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400/60 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Footer note */}
                    <div className="mt-10 text-[11px] uppercase tracking-[0.25em] text-slate-500">
                        Designed with <span className="text-indigo-300">Tony stak</span>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NotFound
