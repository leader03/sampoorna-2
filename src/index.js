import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/login";
import Background from "./components/Background";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/auth/ResetPass";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Background>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </Background>
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);
