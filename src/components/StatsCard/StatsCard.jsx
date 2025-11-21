import React from "react";

function StatsCard({ title, value, subChange, icon }) {
  return (
    <div className="w-[220px] h-[120px] rounded-xl border bg-white border-[#E5E5E5] shadow-sm p-4 flex flex-col justify-center items-start gap-2 text-center">

      <div className="flex items-center gap-2">
        <h4 className="text-[16px] font-normal text-black">{title}</h4>

        {icon && (
          <img src={icon} alt="icon" className="w-5 h-5" />
        )}
      </div>

      <p className="text-[16px] font-bold text-black">{value}</p>

      <p className="text-[15px] text-[#565656]">{subChange}</p>

    </div>

  );
}

export default StatsCard;
