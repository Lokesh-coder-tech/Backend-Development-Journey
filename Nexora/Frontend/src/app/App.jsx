import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../features/auth/auth.slice";


function App() {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const hasAuthToken = localStorage.getItem("auth") === "true";
    if (hasAuthToken) {
      auth.handleGetMe();
    } else {
      // If no token, set loading to false
      dispatch(setLoading(false));
    }
  }, []);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
