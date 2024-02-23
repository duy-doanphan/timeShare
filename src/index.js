import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import GlobalProvider from "./provide";
const root = ReactDOM.createRoot(document.getElementById("root"));

const clientId =
  "969738595303-tp2kogcl498obv32moqan83t73u991tt.apps.googleusercontent.com";

axios.defaults.baseURL = "http://localhost:5296/api/Auth/";
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
