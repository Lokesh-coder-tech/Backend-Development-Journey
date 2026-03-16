import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { Github, Chrome, ArrowRight, Sparkles } from 'lucide-react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleRegister } = useAuth()
  const navigate = useNavigate()
  const loading = useSelector((state) => state.auth.loading)

  const submitForm = async (event) => {
    event.preventDefault()
    const payload = { username, email, password }
    const registeredUser = await handleRegister(payload)
    if (registeredUser) navigate('/')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#050505] px-6 py-20 overflow-hidden font-sans">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(49,184,198,0.15)_0%,transparent_50%)]" />
      <div className="absolute top-[20%] right-[-10%] w-125 h-125 bg-[#31b8c6]/5 blur-[120px] rounded-full" />
      
      <div className="relative w-full max-w-115">
        {/* Logo/Header Area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#31b8c6]/30 bg-[#31b8c6]/5 text-[#31b8c6] text-[10px] uppercase tracking-widest font-bold mb-6">
            <Sparkles size={12} /> Nexora Cloud
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-3">
            Get <span className="text-transparent bg-clip-text bg-linear-to-r from-[#31b8c6] to-[#71f4ff]">Started</span>
          </h1>
          <p className="text-zinc-500 text-sm">Create an account to access the Nexora ecosystem.</p>
        </div>

        {/* Pro Glass Card */}
        <div className="backdrop-blur-2xl bg-[#111111]/80 border border-white/5 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={submitForm} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[1px] ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-zinc-950/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#31b8c6] focus:ring-4 focus:ring-[#31b8c6]/10 transition-all duration-300 placeholder:text-zinc-800"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[1px] ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-zinc-950/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#31b8c6] focus:ring-4 focus:ring-[#31b8c6]/10 transition-all duration-300 placeholder:text-zinc-800"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[1px] ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#31b8c6] focus:ring-4 focus:ring-[#31b8c6]/10 transition-all duration-300 placeholder:text-zinc-800"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#31b8c6] hover:bg-[#45efff] text-black font-extrabold py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_20px_rgba(49,184,198,0.2)] flex items-center justify-center gap-2 group active:scale-95"
            >
              {loading ? "Processing..." : "Create Free Account"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social Auth Section - Fixed Visibility */}
          <div className="relative mt-10 mb-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/80"></div>
            </div>
            <span className="relative px-4 text-[10px] uppercase tracking-[2px] text-zinc-500 bg-[#141414]">
              Quick Access
            </span>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 bg-white/3 hover:bg-white/8 border border-white/5 rounded-2xl py-4 transition-all duration-300 text-sm font-semibold text-zinc-200 group">
              <Github size={20} className="group-hover:text-white transition-colors" />
              <span>GitHub</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-white/3 hover:bg-white/8 border border-white/5 rounded-2xl py-4 transition-all duration-300 text-sm font-semibold text-zinc-200 group">
              <Chrome size={20} className="group-hover:text-white transition-colors" />
              <span>Google</span>
            </button>
          </div>

          <p className="text-center mt-10 text-zinc-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#31b8c6] font-bold hover:text-white transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register