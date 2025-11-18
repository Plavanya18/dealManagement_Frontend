import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../api/auth.service";
import loginlogo from "../../../assets/login.svg";

import "./ResetPassword.css";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);

    const email = localStorage.getItem("pendingEmail");
    const oldPassword = localStorage.getItem("oldPassword");

    const validatePassword = (password) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[@#$%^&*!]/.test(password),
        };
    };

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
            const res = await resetPassword({
                email: email,
                oldPassword: oldPassword,
                newPassword: password,
            });

            if (res?.message === "Password changed successfully") {
                localStorage.removeItem("pendingEmail");
                localStorage.removeItem("oldPassword");
                navigate("/login");
            }
        } catch (err) {
            setError(err.message || "Failed to reset password. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="reset-container">

            <div className="reset-left">
                <img src={loginlogo} alt="Illustration" className="illustration" />
            </div>

            <div className="reset-right">
                <div className="reset-box">
                    <h2 className="reset-title">Reset Password</h2>
                    <p className="reset-subtext">
                        To reset your password, please enter your new password <br />
                        and confirm the new password.
                    </p>


                    <form onSubmit={handleSubmit}>
                        <div className="password-wrapper">
                            <input
                                type={showPass ? "text" : "password"}
                                className="reset-input"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setTouched(true); }}
                                onFocus={() => setTouched(true)}
                            />
                            <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                                👁
                            </span>
                        </div>

                        <div className="password-wrapper">
                            <input
                                type={showConfirmPass ? "text" : "password"}
                                className={`reset-input ${error ? "input-error" : ""}`}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); setTouched(true); }}
                                onFocus={() => setTouched(true)
                                }
                            />
                            <span
                                className="eye-icon"
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                            >
                                👁
                            </span>
                        </div>

                        {error && <p className="error-text">{error}</p>}

                        <ul className="password-rules">
                            <li>
                                <span className={`circle ${rules.length ? "valid" : ""}`}></span>
                                At least 8 characters long
                            </li>
                            <li>
                                <span className={`circle ${rules.uppercase ? "valid" : ""}`}></span>
                                One Uppercase letter (A-Z)
                            </li>
                            <li>
                                <span className={`circle ${rules.lowercase ? "valid" : ""}`}></span>
                                One Lowercase letter (a-z)
                            </li>
                            <li>
                                <span className={`circle ${rules.number ? "valid" : ""}`}></span>
                                One Number (0-9)
                            </li>
                            <li>
                                <span className={`circle ${rules.special ? "valid" : ""}`}></span>
                                One special character (@#$%^&*! )
                            </li>
                        </ul>


                        <div className="reset-buttons">
                            <button
                                type="button"
                                className="reset-btn-back"
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>

                            <button type="submit" className={`reset-btn-login ${touched ? "active-btn" : ""}`}

                                disabled={loading}>
                                {loading ? "Processing..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ResetPassword;
