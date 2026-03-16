import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useEffect } from "react";


function App() {
  const auth = useAuth();

  useEffect(() => {
    const hasAuthToken = localStorage.getItem("auth") === "true";
    if (hasAuthToken) {
      auth.handleGetMe();
    }
  }, []);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
