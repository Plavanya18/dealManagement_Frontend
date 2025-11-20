import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword, resetPasswordViaEmail } from "../../../api/auth.service.jsx";
import loginlogo from "../../../assets/login.svg";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);

    const queryParams = new URLSearchParams(location.search);
    const urlEmail = queryParams.get("email");

    const email = !urlEmail ? localStorage.getItem("pendingEmail") : null;
    const oldPassword = !urlEmail ? localStorage.getItem("oldPassword") : null;

    const validatePassword = (password) => ({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[@#$%^&*!]/.test(password),
    });

    const rules = validatePassword(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!password || !confirmPassword) {
            setError("This fields can't be empty");
            return;
        }


        if (password !== confirmPassword) {
            setError("Passwords doesn't match. Please try again.");
            return;
        }

        setLoading(true);

        try {
            const payload = urlEmail
                ? { email: urlEmail, newPassword: password } 
                : { email, oldPassword, newPassword: password }; 
                
            const res = urlEmail
                ? await resetPasswordViaEmail(payload)
                : await resetPassword(payload);

            if (res?.message === "Password Changed successfully" || res?.message === "Password changed successfully") {
                if (!urlEmail) {
                    localStorage.removeItem("pendingEmail");
                    localStorage.removeItem("oldPassword");
                }
                navigate("/login");
            }
        } catch (err) {
            setError(err.message || "Failed to reset password. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">

            <div className="auth-left">
                <img src={loginlogo} alt="Illustration" className="illustration" />
            </div>

            <div className="auth-right">
                <div className="auth-box">
                    <h2 >Reset Password</h2>
                    <p >
                        To reset your password, please enter your new password <br />
                        and confirm the new password.
                    </p>


                    <form onSubmit={handleSubmit}>
                        <div className="password-wrapper">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setTouched(true); }}
                                onFocus={() => setTouched(true)}
                                required
                                style={{ marginTop: "20px"}}
                            />
                            <span className="eye" onClick={() => setShowPass(!showPass)}>
                                👁
                            </span>
                        </div>

                        <div className="password-wrapper">
                            <input
                                type={showConfirmPass ? "text" : "password"}
                                className={error ? "input-error" : ""}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); setTouched(true); }}
                                onFocus={() => setTouched(true)}
                            />
                            <span
                                className="eye"
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                            >
                                👁
                            </span>
                        </div>

                        {error && <p className="error-text">{error}</p>}

                        <ul className="password-rules">
                            <li><span className={`circle ${rules.length ? "valid" : ""}`}></span>At least 8 characters long</li>
                            <li><span className={`circle ${rules.uppercase ? "valid" : ""}`}></span>One Uppercase letter (A-Z)</li>
                            <li><span className={`circle ${rules.lowercase ? "valid" : ""}`}></span>One Lowercase letter (a-z)</li>
                            <li><span className={`circle ${rules.number ? "valid" : ""}`}></span>One Number (0-9)</li>
                            <li><span className={`circle ${rules.special ? "valid" : ""}`}></span>One special character (@#$%^&*! )</li>
                        </ul>


                        <div className="btn-group">
                            {!urlEmail && (
                                <button
                                    className="back-btn"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                            )}

                            <button
                                className={`continue-btn ${touched ? "active" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ResetPassword;
