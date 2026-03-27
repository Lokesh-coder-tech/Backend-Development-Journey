import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { useSelector } from 'react-redux'; // Data Layer
import { useAuth } from '../hooks/useAuth'; // Logic Layer

const ForgotPassword = () => {
  // 1. Logic Layer: Accessing the specific handler
  const { handleForgotPassword } = useAuth();
  
  // 2. Data Layer: Pulling global state from Redux
  const { loading, error } = useSelector((state) => state.auth);

  // Local state for UI feedback and form tracking
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Call logic layer
    const result = await handleForgotPassword(email);
    
    // If the service returns successfully, show the success box
    if (result) {
      setIsSent(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden selection:bg-indigo-500/30 font-sans px-4">
      
      {/* Background Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-125 h-125 bg-blue-900/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -right-1/4 w-125 h-125 bg-indigo-900/10 blur-[120px] rounded-full" 
        />
      </div>

      {/* Header Branding */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-8 left-10">
        <h2 className="text-2xl font-bold text-white tracking-tighter">SaveHub</h2>
      </motion.div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-135 p-px rounded-[2.5rem] bg-linear-to-b from-white/8 to-transparent mt-7"
      >
        <div className="bg-[#0c0c0c]/95 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-white/2">
          
          <header className="mb-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="w-12 h-12 bg-white/3 border border-white/8 rounded-xl flex items-center justify-center mb-8"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white tracking-tight mb-4"
            >
              Forgot Password?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-lg font-light leading-relaxed tracking-wide"
            >
              Enter your email to receive a reset link. We'll help you reconnect to your digital workspace.
            </motion.p>
          </header>

          {/* Error Display from Data Layer */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-500/5 border-l-4 border-red-500/40 rounded-r-xl"
              >
                <p className="text-sm text-red-200/70">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-2 w-full"
            >
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-[#0d0d0d]/50 border border-white/5 rounded-xl px-4 py-4 text-gray-300 placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500/20 transition-all shadow-inner text-sm disabled:opacity-50"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              disabled={loading}
              type="submit"
              className={`mt-2 w-full h-16 flex items-center justify-center gap-2 rounded-2xl font-bold text-[#050505] transition-all shadow-inner ${
                loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-[#9196ff] shadow-[0_0_20px_rgba(145,150,255,0.2)] hover:shadow-[0_0_30px_rgba(145,150,255,0.4)]'
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>

          {/* Success Instruction Box */}
          <AnimatePresence>
            {isSent && !error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                className="overflow-hidden"
              >
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl flex items-start gap-4">
                  <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-emerald-300/80 font-medium leading-relaxed">
                    Instructions sent! Check your inbox (and spam folder) to reset your password.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to Login */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <Link to="/login" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors group">
              <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Login</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-8 w-full flex justify-center gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-800">
        <span>© 2026 SAVEHUB DIGITAL ASTRAL.</span>
      </footer>
    </div>
  );
};

export default ForgotPassword;