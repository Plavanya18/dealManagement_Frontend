import React from "react";
import StatsCard from "../StatsCard/StatsCard";
import loginlogo from "../../assets/login.svg";

function Dashboard() {
  return (
      <div className="flex flex-wrap gap-5 p-5 h-screen w-screen bg-[#fffef7]"
      >
      <StatsCard
        title="Total Deals"
        value="1200"
        subChange="All deals from this branch"
        color="blue"
      />
      <StatsCard
        title="Pending Deals"
        value="$120K"
        subChange="Awaiting checker approval"
        color="red"
      />
      <StatsCard
        title="Rejected Deals"
        value="2"
        subChange="Declined by checkers"
        color="blue"
      />
      <StatsCard
        title="Branch Customers"
        value="40"
        subChange="10 corporate, 30 retail"
        color="red"
      />
      <StatsCard
        title="Compliance Alerts"
        value="2"
        subChange="Requires attention"
        color="green"
      />
    </div>
  );
}

export default Dashboard;
