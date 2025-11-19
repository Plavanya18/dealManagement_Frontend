import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/auth.service";
import "./ForgotPassword.css";
import loginlogo from "../../../assets/login.svg";
import welcomeImg from "../../../assets/welcome_rafiki.svg";

function ForgotPassword() {
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
        if (today === 0 || today === 6) {
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
        <div className="forgot-container">
            <div className="forgot-left">
                <img src={loginlogo} alt="Illustration" className="illustration" />
            </div>

            <div className="forgot-right">
                <div className="forgot-box">
                    <h2>Forgot Password</h2>
                    <p>
                        To reset your password, please enter your<br />
                        email address below.
                    </p>

                    <input
                        type="email"
                        placeholder="Type your email here"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="btn-group">
                        <button className="back-btn" onClick={() => navigate("/login")}>
                            Back to Login
                        </button>

                        <button
                            className={`continue-btn ${email ? "active" : ""}`}
                            disabled={!email}
                        >
                            Continue
                        </button>

                    </div>
                </div>
            </div>


        </div>
    );

}

export default ForgotPassword;
