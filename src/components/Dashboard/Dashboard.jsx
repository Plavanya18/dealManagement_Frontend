import React from "react";
import StatsCard from "../StatsCard/StatsCard"; // make sure path is correct
import loginlogo from "../../assets/login.svg";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <StatsCard
        title="Total Deals"
        value="1200"
        subChange="All deals from this branch"
        changeType="today"
        color="blue"
      />
      <StatsCard
        title="Pending Deals"
        value="$120K"
        subChange="Awaiting checker approval"
        changeType="today"
        color="red"
      />
      <StatsCard
        title="Rejected Deals"
        value="2"
        subChange="Declined by checkers"
        changeType="default"
        color="blue"
      />
      <StatsCard
        title="Branch Customers"
        value="40"
        subChange="10 corporate, 30 retail"
        changeType="today"
        color="red"
      />
      <StatsCard
        title="Compliance Alerts"
        value="2"
        subChange="Requires attention"
        changeType="closing"
        color="green"
      />
    </div>
  );
}

export default Dashboard;
