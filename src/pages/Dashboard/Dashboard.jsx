import React from "react";
import StatsCard from "../../components/StatsCard/StatsCard";
import joinhandIcon from "../../assets/join_hand.svg";
import pendingDealIcon from "../../assets/pending_deal.svg";
import rejectedDealIcon from "../../assets/rejected_deal.svg";
import candiateIcon from "../../assets/candidate.svg";
import compilanceIcon from "../../assets/compilance.svg";

function Dashboard() {
  return (
      <div className="flex flex-wrap gap-5 p-5 h-screen w-screen bg-[#fffef7]"
      >
      <StatsCard
        title="Total Deals"
        value="1200"
        subChange="All deals from this branch"
        icon={joinhandIcon}
      />
      <StatsCard
        title="Pending Deals"
        value="$120K"
        subChange="Awaiting checker approval"
        icon={pendingDealIcon}
      />
      <StatsCard
        title="Rejected Deals"
        value="2"
        subChange="Declined by checkers"
        icon={rejectedDealIcon}
      />
      <StatsCard
        title="Branch Customers"
        value="40"
        subChange="10 corporate, 30 retail"
        icon={candiateIcon}
      />
      <StatsCard
        title="Compliance Alerts"
        value="2"
        subChange="Requires attention"
        icon={compilanceIcon}
      />
    </div>
  );
}

export default Dashboard;
