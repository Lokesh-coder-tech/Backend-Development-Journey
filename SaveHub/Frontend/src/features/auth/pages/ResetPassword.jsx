import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useNavigate } from "react-router"; // Added useParams and useNavigate
import { useSelector } from 'react-redux'; // Data Layer
import { useAuth } from '../hooks/useAuth'; // Logic Layer

const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from the URL
  const navigate = useNavigate();
  
  // 1. Logic Layer: Accessing the reset handler
  const { handleResetPassword } = useAuth();
  
  // 2. Data Layer: Pulling global state from Redux
  const { loading, error } = useSelector((state) => state.auth);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({ score: 0, label: 'EMPTY', color: 'bg-gray-800' });
  const [isSuccess, setIsSuccess] = useState(false);

  // Real-time Strength Validation (Internal Presentation Logic)
  useEffect(() => {
    const evaluateStrength = (p) => {
      let score = 0;
      if (!p) return { score: 0, label: 'EMPTY', color: 'bg-gray-800' };
      if (p.length > 6) score++;
      if (/[A-Z]/.test(p)) score++;
      if (/[0-9]/.test(p)) score++;
      if (/[^A-Za-z0-9]/.test(p)) score++;

      switch (score) {
        case 1: return { score: 1, label: 'WEAK', color: 'bg-red-500' };
        case 2: return { score: 2, label: 'FAIR', color: 'bg-yellow-500' };
        case 3: return { score: 3, label: 'GOOD', color: 'bg-emerald-400' };
        case 4: return { score: 4, label: 'STRONG', color: 'bg-emerald-500' };
        default: return { score: 0, label: 'EMPTY', color: 'bg-gray-800' };
      }
    };
    setStrength(evaluateStrength(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side Validation
    if (!password || password.trim() === "") {
      alert("Please enter a new password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (strength.score < 2) {
      alert("Please choose a stronger password.");
      return;
    }

    // 2. Call Logic Layer
    // We send 'password' (the value from our state) and 'token' (from useParams)
    const result = await handleResetPassword(password, token);
    
    if (result) {
      setIsSuccess(true);
      // Redirect to login after a brief success message
      setTimeout(() => navigate('/login'), 3000);
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden font-sans px-4 selection:bg-indigo-500/30">
      
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-150 h-150 bg-indigo-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-1/4 w-150 h-150 bg-emerald-900/5 blur-[120px] rounded-full" />
      </div>

      {/* Brand Header */}
      <div className="absolute top-8 left-10">
        <h2 className="text-2xl font-bold text-white tracking-tighter">SaveHub</h2>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 40 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 z-50 flex items-center gap-3 bg-[#111] border border-emerald-500/20 px-6 py-3 rounded-full shadow-2xl"
          >
            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-gray-200 text-sm font-medium">Identity Secured. Redirecting to Login...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 w-full max-w-155 bg-[#0c0c0c] rounded-[3rem] p-10 md:p-16 border border-white/3 shadow-2xl relative mt-7"
      >
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight mb-4">Secure Your Account</h1>
          <p className="text-gray-500 text-lg font-light leading-relaxed">Create a unique password to regain access to your Digital Astral.</p>
        </header>

        {/* Global Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">New Password</label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Strength Meter */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
              <span className="text-gray-500">Security Strength</span>
              <span className={strength.score > 0 ? strength.color.replace('bg-', 'text-') : 'text-gray-700'}>
                {strength.label}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3 h-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`rounded-full transition-all duration-500 ${i <= strength.score ? strength.color : 'bg-gray-800'}`} 
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-16 rounded-2xl font-bold text-[#050505] shadow-[0_0_30px_rgba(145,150,255,0.2)] transition-all ${loading ? 'bg-gray-600 opacity-50' : 'bg-[#9196ff] hover:scale-[1.01]'}`}
          >
            {loading ? "Updating Identity..." : "Reset Password"}
          </button>

          <div className="text-center mt-6">
            <Link to="/login" className="text-[11px] font-bold text-white tracking-widest uppercase hover:underline underline-offset-8 decoration-white/20">
              Cancel and return to login
            </Link>
          </div>
        </form>
      </motion.div>

      <footer className="absolute bottom-8 w-full flex justify-center text-[9px] font-bold uppercase tracking-[0.3em] text-gray-800">
        <span>© 2026 SaveHub Digital Astral.</span>
      </footer>
    </div>
  );
};

export default ResetPassword;