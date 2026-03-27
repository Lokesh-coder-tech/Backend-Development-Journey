import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router"; // Added useNavigate
import { useSelector } from "react-redux"; // Added to access global data layer
import { useAuth } from "../hooks/useAuth"; // Added Logic Layer
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../auth.slice";
/**
 * FormInput Component (Presentation Layer)
 */
const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    className="flex flex-col gap-2 w-full"
  >
    <div className="flex justify-between items-center px-1">
      <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold ml-1">
        {label}
      </label>
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#0d0d0d] border border-white/5 rounded-lg px-4 py-3.5 text-gray-300 placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-purple-500/20 transition-all shadow-inner text-sm"
      required
    />
  </motion.div>
);

const Login = () => {
  const dispatch = useDispatch();
  const [googleError, setGoogleError] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setGoogleError(null);
      // Send the Google JWT to your backend
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/google", // Your backend URL
        { token: credentialResponse.credential },
        { withCredentials: true }, // Crucial to receive the 'token' cookie
      );

      if (data.success) {
        // 1. Update Redux state with user data
        dispatch(setUser(data.user));
        // 2. Redirect user (e.g., to dashboard)
        window.location.href = "/dashboard";
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Google login failed";
      setGoogleError(message);
      console.error("Backend Error:", message);
    }
  };

  const navigate = useNavigate();

  // 1. Logic Layer: Accessing authentication functions
  const { handleLogin } = useAuth();

  // 2. Data Layer: Pulling global state from Redux (auth.slice.js)
  const { loading, error } = useSelector((state) => state.auth);

  // Local state only for form input tracking
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call logic layer (handleLogin uses auth.api.js and updates auth.slice.js)
    const result = await handleLogin({
      email: formData.email,
      password: formData.password,
    });

    // If API returns user data, redirect to dashboard
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden selection:bg-purple-500/30 font-sans px-4">
      {/* Background Radial Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-150 h-150 bg-blue-900/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -right-1/4 w-150 h-150 bg-indigo-900/10 blur-[120px] rounded-full"
        />
      </div>

      {/* Top Brand */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-8 left-10"
      >
        <h2 className="text-2xl font-bold text-white tracking-tight">
          SaveHub
        </h2>
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-135 p-px rounded-4xl bg-linear-to-b from-white/10 to-transparent mt-20 mb-12"
      >
        <div className="bg-[#0f0f0f]/90 backdrop-blur-3xl rounded-4xl p-8 md:p-12 shadow-2xl border border-white/5">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Welcome Back<span className="text-indigo-400">.</span>
            </h1>
            <p className="text-gray-400 text-lg font-light">
              Secure your digital astral assets.
            </p>
          </header>

          {/* Error Alert using global error from Redux */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-red-500/5 border-l-4 border-red-500/40 p-4 rounded-r-xl flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-sm text-red-200/70 font-medium">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FormInput
              label="Email Address"
              name="email"
              placeholder="alex.vance@nebula.io"
              value={formData.email}
              onChange={handleInputChange}
              index={1}
            />

            <div className="space-y-2">
              <FormInput
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleInputChange}
                index={2}
              />
              <div className="flex justify-end pr-1">
                <Link
                  to="/forgotPassword"
                  size="sm"
                  className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold hover:text-white transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
              type="submit"
              className={`mt-4 w-full h-15 rounded-xl font-bold text-[#050505] transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-linear-to-r from-[#9d9dff] to-[#7c7cff] shadow-[0_0_20px_rgba(157,157,255,0.2)]"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-[0.4em] text-gray-700">
              <span className="bg-[#0f0f0f] px-4">Or Continue With</span>
            </div>
          </div>

          {/* Social login */}
          <div className="w-full flex flex-col items-center gap-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={(error) => {
                const message =
                  error?.error ||
                  error?.details ||
                  "Google login failed (origin may be unauthorized).";
                setGoogleError(message);
                console.error("Google Login Error:", error);
              }}
              theme="filled_black"
              shape="pill"
              width="280" // Slightly wider feels more "stable"
            />

            {googleError && (
              <div className="mt-2 text-center text-sm text-red-300 px-4">
                <p>
                  {googleError}
                </p>
                <p className="text-xs text-red-200/70">
                  Please make sure your Google OAuth client’s
                  Authorized JavaScript origins include your app URL
                  (e.g., http://localhost:5173). If deployed, include your
                  production domain too.
                </p>
              </div>
            )}
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            New to the astral plane?{" "}
            <Link
              to="/register"
              className="text-white font-bold hover:text-indigo-400 ml-1 transition-colors underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-8 w-full flex justify-center gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-800">
        <span>© 2026 SAVEHUB DIGITAL ASTRAL.</span>
      </footer>
    </div>
  );
};

export default Login;
