import React, { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard/StatsCard";
import UniversalTable from "../../components/Table/Table";
import joinhandIcon from "../../assets/join_hand.svg";
import pendingDealIcon from "../../assets/pending_deal.svg";
import rejectedDealIcon from "../../assets/rejected_deal.svg";
import candiateIcon from "../../assets/candidate.svg";
import compilanceIcon from "../../assets/compilance.svg";
import searchIcon from "../../assets/search.svg";
import downloadIcon from "../../assets/download.svg";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { fetchDashboardData } from "../../api/dashboardService";
import { fetchDeals } from "../../api/deal.service";
import { fetchFxRate } from "../../api/fxrate.service";

function Dashboard() {
  const [data, setData] = useState(null);
  const [deals, setDeals] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fxRate, setFxRate] = useState(null);

  useEffect(() => {
    async function loadData() {
      const dashboardResult = await fetchDashboardData();
      setData(dashboardResult);

      const dealsResult = await fetchDeals();
      setDeals(dealsResult || []);

      const fxResult = await fetchFxRate({ page: 1, limit: 1, orderBy: "created_at" });
      setFxRate(fxResult?.[0] || null);
    }
    loadData();
  }, []);

  const handleSearchKeyPress = async (e) => {
  if (e.key === "Enter") {
    const dealsResult = await fetchDeals({
      search: searchValue, 
    });
    setDeals(dealsResult || []);
  }
};

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

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const formattedDeals = deals.map((deal) => ({
    deal_number: deal.deal_number,
    type: capitalize(deal.deal_type),
    currency: deal.baseCurrency?.code || "N/A",
    amount: deal.amount,
    status: deal.status?.name || "N/A",
    Date: new Date(deal.created_at).toLocaleDateString(),
  }));

  console.log("formattedDeals", formattedDeals);
  return (
    <div className="min-h-screen bg-[#fffef7]">
      <Navbar />

      <div className="flex">
        <div className="w-[220px]">
          <Sidebar />
        </div>
        <div className="flex-1 p-5">

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-black font-bold text-xl ml-4">Dashboard</h1>
              <p className="text-gray-500 text-sm ml-4">System oversight and compliance management</p>
            </div>

            <div className="w-[440px] h-11 overflow-hidden bg-white rounded-md flex items-center">
            <div className="animate-marquee whitespace-nowrap text-medium text-gray-700">

              {fxRate ? (
                <>
                  {fxRate.baseCurrency?.code}/{fxRate.quoteCurrency?.code}
                  &nbsp;– Buy: {fxRate.buy_rate} | Sell: {fxRate.sell_rate}
                  &nbsp;&nbsp;&nbsp;
                </>
              ) : (
                "Loading FX Rate..."
              )}

            </div>
          </div>

            <button className="bg-[#FFCC00] text-black w-[180px] h-10 font-semibold px-4 py-2 rounded-lg shadow hover:brightness-95 flex items-center gap-2 justify-center mr-12">
              <img src={downloadIcon} alt="download" className="w-5 h-5" />
              <span>Generate Report</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-5 mb-5">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mr-10 ml-4">
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
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg border-[#E1E1E1] text-sm focus:outline-none focus:border-[#E1E1E1]"
                />
              </div>
            </div>
            <UniversalTable columns={columns} rows={formattedDeals.slice(0, 5)} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
