import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendResetPasswordEmail } from "../../../api/auth.service";
import "./ForgotPassword.css";
import loginlogo from "../../../assets/login.svg";
import welcomeImg from "../../../assets/welcome_rafiki.svg";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleContinue = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!email) {
            setErrorMessage("Email field cannot be empty.");
            return;
        }

        try {
            await sendResetPasswordEmail(email);
            setSubmitted(true);
        } catch (err) {
            setErrorMessage(err.message || "Failed to send reset email");
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-left">
                <img src={loginlogo} alt="Illustration" className="illustration" />
            </div>

            <div className="forgot-right">
                <div className="forgot-box">
                    {!submitted ? (
                        <>
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
                                className={errorMessage ? "input-error" : ""}
                            />
                            {errorMessage && (
                                <p className="error-text">{errorMessage}</p>
                            )}

                            <div className="btn-group">
                                <button
                                    className="back-btn"
                                    onClick={() => navigate("/login")}
                                >
                                    Back to Login
                                </button>

                                <button
                                    className={`continue-btn ${email ? "active" : ""}`}
                                    disabled={!email}
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="confirmation-message">
                            <h2 style={{ color: "#D8AD00", fontSize: "32px", fontWeight: "700", fontFamily: "Sk-Modernist", fontStyle: "bold" }}>
                                A temporary access link<br />
                                has been sent to your<br />
                                email address.
                            </h2>
                            <p style={{ color: "#404040" }}>
                                Please click the link in the email to create a <br />
                                new password for your account.
                            </p>
                        </div>
                    )}
                </div>
            </div>


        </div>
    );

}

export default ForgotPassword;
