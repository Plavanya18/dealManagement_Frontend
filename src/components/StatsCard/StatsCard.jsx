import React from "react";

function StatsCard({ title, value, subChange, icon }) {
  const isCompliance = title === "Compliance Alerts";
  return (
    <div
      className={`w-[220px] h-[120px] rounded-xl border shadow-sm p-4 flex flex-col justify-between
        ${isCompliance
          ? "border-[#EB1D2EFC] bg-[#FFF1F3]"
          : "border-[#00000033] bg-white"
        }
      `}
    >

      <div className="flex justify-between items-center w-full">
        <h4 className="text-[16px] font-normal text-black">{title}</h4>

        {icon && <img src={icon} alt="icon" className="w-5 h-5" />}
      </div>

      <p className="text-[20px] font-bold text-black">{value}</p>

      <p
        className={`text-[14px] mt-1 ${isCompliance ? "text-[#EB1D2E]" : "text-[#565656]"
          }`}
      >
        {subChange}
      </p>
    </div>
  );
}

export default StatsCard;
