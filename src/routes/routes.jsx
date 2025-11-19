import React from "react";
import Login from "../components/Auth/Login/Login";
import { Routes, Route } from "react-router-dom";
import VerifyOtp from "../components/Auth/VerifyLogin/VerifyLogin";
import ResetPassword from "../components/Auth/ResetPassword/ResetPassword";
import Dashboard from "../components/Dashboard/Dashboard";
import IpBlocked from "../components/Error/IpBlocked";
import AccountDisabled from "../components/Error/AccountDeactivated";
import ForgotPassword from "../components/Auth/ForgetPassword/ForgotPassword";

function AppRoutes() {

  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-login" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/ip-blocked" element={<IpBlocked />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-disabled" element={<AccountDisabled />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default AppRoutes;
