import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth'; 
import { GoogleLogin } from '@react-oauth/google';

/**
 * Reusable FormInput for consistency across the Astral UI
 */
const FormInput = ({ label, type = "text", placeholder, value, name, onChange, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    className="flex flex-col gap-2 w-full"
  >
    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#0d0d0d]/50 border border-white/5 rounded-xl px-4 py-4 text-gray-300 placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500/20 transition-all shadow-inner text-sm"
      required
    />
  </motion.div>
);

const Register = () => {
  const navigate = useNavigate();
  const { handleGoogleLogin, handleRegister } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);
  const [googleError, setGoogleError] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });

  const onGoogleSuccess = async (credentialResponse) => {
    try {
      setGoogleError(null);
      const user = await handleGoogleLogin(credentialResponse.credential);
      if (user) navigate('/');
    } catch (err) {
      setGoogleError(err?.message || 'Google sign-up failed');
    }
  };

  const onGoogleError = (error) => {
    const message =
      error?.error ||
      error?.details ||
      'Google sign-up failed (make sure OAuth origin is configured).';
    setGoogleError(message);
    console.error('Google Registration Error:', error);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await handleRegister({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });

    if (result) navigate('/'); 
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden selection:bg-indigo-500/30 font-sans px-4">
      
      {/* Background Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/4 -left-1/4 w-125 h-125 bg-blue-900/10 blur-[120px] rounded-full" />
        <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-0 -right-1/4 w-125 h-125 bg-indigo-900/10 blur-[120px] rounded-full" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-8 left-10">
        <h2 className="text-2xl font-bold text-white tracking-tighter">SaveHub</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-145 p-px rounded-[2.5rem] bg-linear-to-b from-white/8 to-transparent mt-20 mb-12"
      >
        <div className="bg-[#0c0c0c]/90 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-white/2">
          
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
              Enter the Astral<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              Begin your journey into seamless knowledge preservation.
            </p>
          </header>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FormInput label="Username" name="username" placeholder="AstridV" value={formData.username} onChange={handleInputChange} index={1} />
            <FormInput label="Email Address" type="email" name="email" placeholder="astrid@digital.astral" value={formData.email} onChange={handleInputChange} index={2} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} index={3} />
              <FormInput label="Confirm" type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} index={4} />
            </div>

            <div className="flex items-center gap-3 mt-2 group cursor-pointer" onClick={() => setFormData({...formData, agreed: !formData.agreed})}>
              <div className="relative flex items-center">
                <input type="checkbox" name="agreed" checked={formData.agreed} readOnly className="peer h-5 w-5 appearance-none rounded border border-white/10 bg-white/5 checked:bg-indigo-500 transition-all cursor-pointer" />
                <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity ml-0.75 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[11px] text-gray-500 select-none">I acknowledge the <span className="text-indigo-300 hover:underline cursor-pointer">Terms of Service</span>.</p>
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              type="submit"
              disabled={loading}
              className={`mt-2 w-full h-16 rounded-2xl font-bold text-[#050505] transition-all shadow-inner ${loading ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-[#9196ff] shadow-[0_0_20px_rgba(145,150,255,0.2)]'}`}
            >
              {loading ? "Synchronizing..." : "Create Identity"}
            </motion.button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-[0.4em] text-gray-700">
              <span className="bg-[#0c0c0c] px-6">Or continue with</span>
            </div>
          </div>

          {/* CUSTOM GOOGLE BUTTON (MATCHES AESTHETIC) */}
          {/* <div className="w-full max-w-md mx-auto">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
              theme="filled_black"
              shape="pill"
              width={280} // numeric width required by Google Identity Services
            />
            {googleError && (
              <div className="mt-2 text-center text-red-300 text-xs px-2">
                {googleError}
              </div>
            )}
          </div> */}

          <p className="mt-10 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-white font-bold hover:text-indigo-400 ml-1 transition-colors underline-offset-4 hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;