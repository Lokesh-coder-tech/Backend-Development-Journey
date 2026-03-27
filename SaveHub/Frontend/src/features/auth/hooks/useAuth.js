import { useDispatch } from "react-redux";
import { register, login, getMe, forgotPassword, resetPassword, logoutUser } from "../service/auth.api";
import { setUser, setLoading, setError, logout } from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setLoading(true));
      const data = await register({ email, username, password });
      dispatch(setUser(data.user));
      localStorage.setItem("auth", "true");
      return data.user;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      localStorage.setItem("auth", "true");
      return data.user;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (err) {
      // If the token is invalid or missing, clear auth state so we don't keep retrying.
      if (err.response?.status === 401) {
        localStorage.removeItem("auth");
        dispatch(setUser(null));
      }
      dispatch(
        setError(err.response?.data?.message || "Failed to fetch user data"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
 
  async function handleForgotPassword(email) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null)); // Clear previous errors
      const data = await forgotPassword({ email });
      // Usually, we don't set a user here, just return the message (e.g., "Email sent")
      return data; 
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to send reset email";
      dispatch(setError(errorMessage));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleResetPassword(newPassword, token) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      // Passing password and token to your API service
      const data = await resetPassword({ newPassword, token });
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Password reset failed";
      dispatch(setError(errorMessage));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGoogleLogin(token) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Send the access_token to the Service Layer
      const data = await googleAuth(token);

      // If successful, update the Data Layer (Redux)
      dispatch(setUser(data.user));
      localStorage.setItem("auth", "true");
      
      return data.user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Google authentication failed";
      dispatch(setError(errorMessage));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

async function handleLogout() {
  try {
    await logoutUser(); // Calls your backend to clear the cookie
    dispatch(logout()); // Calls your Redux slice to clear the state
    window.location.href = "/login"; // Redirects the user
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
  
  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleForgotPassword,
    handleResetPassword,
    handleGoogleLogin,
    handleLogout
  };
}
