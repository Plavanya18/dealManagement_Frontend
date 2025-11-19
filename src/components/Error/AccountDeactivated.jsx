import React from "react";
import lockIcon from "../../assets/lock_clock.svg"; 

function AccountDisabled() {
  return (
    <div className="disabled-container">
      <div className="disabled-box">
        <img src={lockIcon} className="disabled-icon" alt="Disabled" />

        <div className="disabled-content">
          <h2 className="disabled-title">Account Temporarily Disabled</h2>
          <p>Your account is temporarily deactivated on Saturdays and Sundays for routine system checks and updates.</p>
          <p>You’ll be able to access your account again starting Monday morning.</p>
        </div>
      </div>
    </div>
  );
}

export default AccountDisabled;
