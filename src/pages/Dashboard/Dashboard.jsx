import React, { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard/StatsCard";
import UniversalTable from "../../components/Table/Table";
import joinhandIcon from "../../assets/join_hand.svg";
import pendingDealIcon from "../../assets/pending_deal.svg";
import rejectedDealIcon from "../../assets/rejected_deal.svg";
import candiateIcon from "../../assets/candidate.svg";
import compilanceIcon from "../../assets/compilance.svg";
import searchIcon from "../../assets/search.svg";
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
    { label: "Deal Number", key: "deal_number" },
    { label: "Type", key: "type" },
    { label: "Currency", key: "currency" },
    { label: "Amount (TZS)", key: "amount" },
    { label: "Status", key: "status" },
    { label: "Date", key: "Date" },
  ];

  const formattedDeals = deals.map((deal) => ({
    deal_number: deal.deal_number,
    type: deal.deal_type,
    currency: deal.baseCurrency?.code || "N/A",
    amount: deal.amount,
    status: deal.status?.name || "N/A",
    Date: new Date(deal.created_at).toLocaleDateString(),
  }));

  console.log("formattedDeals", formattedDeals);
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

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">
              Today's Deal
            </h2>
            <p className="text-medium text-gray-500">
              Deals processed today in this branch
            </p>
          </div>
          <div className="relative w-[320px]">
            <img
                src={searchIcon}
                alt="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
              />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 border rounded-lg border-[#E1E1E1] text-sm focus:outline-none focus:border-[#E1E1E1]"
            />
          </div>
        </div>
        <div className="">
          <UniversalTable columns={columns} rows={formattedDeals} />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
