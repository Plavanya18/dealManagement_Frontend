import React from "react";
import Login from "../components/Auth/Login/Login";
import { Routes, Route } from "react-router-dom";
import VerifyOtp from "../components/Auth/VerifyLogin/VerifyLogin";
import ResetPassword from "../components/Auth/ResetPassword/ResetPassword";

function AppRoutes() {

  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-login" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default AppRoutes;
