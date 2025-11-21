import React from "react";

function StatsCard({ title, value, subChange, icon }) {
  return (
    <div  className="w-[220px] h-[120px] bg-white rounded-xl border border-[#E5E5E5] shadow-sm p-4 flex flex-col justify-center gap-2">
      
      <div className="flex justify-between items-start p-6">
        <h4 className="text-[16px] font-semibold text-black">{title}</h4>

        {icon && (
          <img src={icon} alt="icon" className="w-6 h-6" />
        )}
      </div>

      <p className="text-[16px] font-bold text-black mt-1">{value}</p>

      <p className="text-[15px] text-[#6c757d] mt-1">{subChange}</p>
    </div>
  );
}

export default StatsCard;
