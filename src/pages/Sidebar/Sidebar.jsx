import React from "react";
import { NavLink } from "react-router-dom";
import settingIcon from "../../assets/setting.svg";
import dashboardIcon from "../../assets/home.svg";
import userCandidateIcon from "../../assets/user_candidates.svg";
import newsIcon from "../../assets/news.svg";
import candidateIcon from "../../assets/black_candidate.svg";
import dealIcon from "../../assets/black_deals.svg";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg text-sm text-[16px] transition-colors mt-2 ${
      isActive
        ? "bg-gradient-to-r from-[#FFCC00] to-[#FFD633] text-black text-[16px] font-bold"
        : "text-black hover:bg-gray-100 hover:text-[#000000]"
    }`;

  return (
    <aside className="w-[220px] h-[600px] bg-white p-1 flex flex-col shadow-md">
      <ul className="flex flex-col gap-1">
        <li>
          <NavLink to="/dashboard" className={linkClasses}>
            <img src={dashboardIcon} alt="dashboard" className="w-5 h-5" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={linkClasses}>
            <img src={userCandidateIcon} alt="users" className="w-5 h-5" />
            User Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className={linkClasses}>
            <img src={candidateIcon} alt="customers" className="w-5 h-5" />
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/deals" className={linkClasses}>
            <img src={dealIcon} alt="deals" className="w-5 h-5" />
            Deals
          </NavLink>
        </li>
        <li>
          <NavLink to="/Audit" className={linkClasses}>
            <img src={newsIcon} alt="audit" className="w-5 h-5" />
            Audit Logs
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={linkClasses}>
            <img src={settingIcon} alt="settings" className="w-5 h-5" />
            Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
