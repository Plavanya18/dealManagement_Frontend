import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import warningIcon from "../../assets/warning.svg";

function IpBlocked() {
  const navigate = useNavigate();
  const location = useLocation();
  const backendMessage = location.state?.backendMessage || "";

  const ipAddress =
    backendMessage.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/)?.[0] || "Unknown";

  const handleUnlock = () => {
    navigate("/login");
  };

  return (
    <div className="ip-block-container">

      <div className="ip-block-box">
      <img src={warningIcon} alt="Warning" className="ip-icon" />

      <div className="ip-content">
        <h2 className="ip-title">Temporarily Banned IP address</h2>

        <p className="ip-description">
          Your IP address <strong>{ipAddress}</strong> has been temporarily blocked for the following service:
          <br />• Email
        </p>

        <div className="ip-reasons">
          <p><strong>Possible reasons:</strong></p>
          <ul>
            <li>Too many login attempts in a short time</li>
            <li>Login attempts with incorrect credentials</li>
            <li>Multiple failed connection attempts to the server</li>
          </ul>
        </div>

        <div className="ip-actions">
          <p><strong>What you can do:</strong></p>
          <p>
            You can unlock your IP by pressing the "Unlock" button below.
            <br />If the issue persists, your IP may be blocked again.
            <br />We recommend contacting our support team to understand the cause and prevent it from happening in the future.
          </p>
        </div>

        <button className="unlock-btn unlock-right" onClick={handleUnlock}>
          Unlock
        </button>
      </div>

    </div>

    </div>
  );
}

export default IpBlocked;
