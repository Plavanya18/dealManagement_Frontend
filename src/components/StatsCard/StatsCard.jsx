import React from "react";

function StatsCard({ title, value, change, subChange, changeType, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        {change && (
          <span
            className={
              changeType === "closing"
                ? "closing-soon"
                : `change ${changeType}`
            }
          >
            {change}
          </span>
        )}
        {icon && (
          <div className="stat-icon-right">
            <img src={icon} alt="icon" />
          </div>
        )}
      </div>

      <h4>{title}</h4>
      <p className="value">{value}</p>

      {subChange && title === "Total Candidates" && (
        <p className="value-change">
          <span className="green-text">{subChange.split(" ")[0]}</span>{" "}
          <span className="grey-text">
            {subChange.replace(/^\+\d+\s*/, "")}
          </span>
        </p>
      )}

      {subChange && title !== "Total Candidates" && (
        <p className="value-change grey-text">{subChange}</p>
      )}
    </div>
  );
}

export default StatsCard;
