import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../../api/auth.service.jsx";
import loginlogo from "../../../assets/login.svg";
import welcomeImg from "../../../assets/welcome_rafiki.svg";
import authlogo from "../../../assets/authsymbol.svg";

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");

  const email = localStorage.getItem("pendingEmail");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    try {
      const res = await verifyOtp(email, otp);

      const token = res.data.token;  
      const user = res.data;      

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      localStorage.removeItem("pendingEmail");

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left">
        <img src={loginlogo} alt="Illustration" className="illustration" />
      </div>

      <div className="auth-right">
        <div className="auth-box">

          <img src={welcomeImg} alt="Welcome" className="welcome-img" />
          <div className="otp-card">
            <div className="otp-header">
              <img src={authlogo} alt="auth logo" className="auth-icon" />
              <p className="otp-title">Multi-Factor Authentication</p>
            </div>

            <p className="otp-sub">Enter OTP sent to your email</p>
          </div>

          <input
            className="otp-input"
            type="text"
            maxLength="4"
            placeholder="Enter your 4-digit email OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {error && <p className="otp-error">{error}</p>}

          <div className="btn-group">
              <button className="back-btn" onClick={() => navigate("/login")}>
                  Back
              </button>

              <button className={`continue-btn ${otp.length === 4 ? "active" : ""}`}  onClick={handleVerify}>
                  Verify & Login
              </button>
          </div>

          <p className="otp-time">
            OTP sent at {new Date().toLocaleTimeString()}
          </p>

          {timer > 0 ? (
            <p className="resend-text">Resend available in {timer}s</p>
          ) : (
            <p className="resend-link" onClick={() => setTimer(60)}>
              Resend OTP
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
