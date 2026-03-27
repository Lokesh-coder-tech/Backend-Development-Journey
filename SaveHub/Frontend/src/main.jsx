import { createRoot } from "react-dom/client";
import "./app/index.css";
import App from "./app/App.jsx";
import { store } from "./app/app.store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "1066882408708-vfcj3pokjc4add4p594fjsmd5no74k8c.apps.googleusercontent.com";

if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
  console.warn(
    "VITE_GOOGLE_CLIENT_ID is not set. Using fallback client ID that may not be authorized for your origin.",
  );
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
);
