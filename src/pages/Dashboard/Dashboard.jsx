import React, { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard/StatsCard";
import Table from "../../components/Table/Table";
import joinhandIcon from "../../assets/join_hand.svg";
import pendingDealIcon from "../../assets/pending_deal.svg";
import rejectedDealIcon from "../../assets/rejected_deal.svg";
import candiateIcon from "../../assets/candidate.svg";
import compilanceIcon from "../../assets/compilance.svg";
import { fetchDashboardData } from "../../api/dashboardService";
import { fetchDeals } from "../../api/deal.service";

function Dashboard() {
  const [data, setData] = useState(null);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    async function loadData() {
      const dashboardResult = await fetchDashboardData();
      setData(dashboardResult);

      const dealsResult = await fetchDeals();
      setDeals(dealsResult || []);
    }
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  const totalDeals = data.deals?.total || 0;
  const pendingDeals =
    data.deals?.overallByStatus?.find((s) => s.status_name === "Pending")
      ?.count || 0;

  const rejectedDeals =
    data.deals?.overallByStatus?.find((s) => s.status_name === "Rejected")
      ?.count || 0;

  const totalCustomers = data.customers?.total || 0;

  const complianceAlerts = data.complianceAlerts?.total || 0;
  const columns = [
    "Deal Number",
    "Type",
    "Currency",
    "Amount (TZS)",
    "Status",
    "Date",
  ];

  const formattedDeals = deals.map((deal) => ({
    deal_number: deal.deal_number,
    type: deal.deal_type,
    currency: deal.baseCurrency?.code || "N/A",
    amount: deal.amount,
    status: deal.status?.name || "N/A",
    Date: new Date(deal.created_at).toLocaleDateString(),
  }));

  return (
    <div className="p-5 w-full min-h-screen bg-[#fffef7]">

      <div className="flex flex-wrap gap-5 mb-10">
        <StatsCard
          title="Total Deals"
          value={totalDeals}
          subChange="All deals from this branch"
          icon={joinhandIcon}
        />
        <StatsCard
          title="Pending Deals"
          value={pendingDeals}
          subChange="Awaiting checker approval"
          icon={pendingDealIcon}
        />
        <StatsCard
          title="Rejected Deals"
          value={rejectedDeals}
          subChange="Declined by checkers"
          icon={rejectedDealIcon}
        />
        <StatsCard
          title="Branch Customers"
          value={totalCustomers}
          subChange="Customers under your branch"
          icon={candiateIcon}
        />
        <StatsCard
          title="Compliance Alerts"
          value={complianceAlerts}
          subChange={
            complianceAlerts > 0
              ? "Requires immediate attention"
              : "No alerts found"
          }
          icon={compilanceIcon}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold mb-3">Recent Deals</h2>
        <Table columns={columns} data={formattedDeals} />
      </div>

    </div>
  );
}

export default Dashboard;
