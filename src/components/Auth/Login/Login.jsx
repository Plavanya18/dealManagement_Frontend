import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/auth.service";
import "./login.css";
import loginlogo from "../../../assets/login.svg";
import welcomeImg from "../../../assets/welcome_rafiki.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const today = new Date().getDay(); 
    if (today === 0 || today === 6) { // Sunday (0) and Saturday (6)
      navigate("/account-disabled", {
        state: {
          message:
            "Your account is temporarily deactivated on weekends for routine system checks. Please try again on Monday."
        }
      });
      return;
    }

    try {
      const res = await loginUser(email, password);

      if (res.status === "FORCE_PASSWORD_CHANGE") {
        localStorage.setItem("pendingEmail", email);
        localStorage.setItem("oldPassword", password);
        navigate("/reset-password");
        return;
      }

      if (res.message === "OTP sent to registered email address.") {
        localStorage.setItem("pendingEmail", email);
        navigate("/verify-login");
        return;
      }

    } catch (error) {
      const backendMsg =
        error?.data?.error ||
        error?.data?.message ||
        error?.message;

      if (backendMsg?.includes("IP not whitelisted")) {
        navigate("/ip-blocked", { state: { backendMessage: backendMsg } });
        return;
      }

      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={loginlogo} alt="Illustration" className="illustration" />
      </div>

      <div className="login-right">
        <div className="login-box">
          <img src={welcomeImg} alt="Welcome" className="welcome-img" />

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Type your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsInputActive(true)}
                onBlur={() => setIsInputActive(false)}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsInputActive(true)}
                  onBlur={() => setIsInputActive(false)}
                  required
                  className={errorMessage ? "input-error" : ""}
                />
                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁
                </span>
              </div>
              {errorMessage && (
                <p className="error-text">{errorMessage}</p>
              )}

              <div className="remember-forgot">
                <label className="remember-me">
                  <input type="checkbox" />
                   Remember me
                </label>

                <a href="#" className="forgot">Forgot password?</a>
              </div>
            </div>

            <button type="submit"  
            className={`login-btn ${(email || password) ? "active-btn" : ""}`}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
