import React, { useState } from "react";
import uparrowIcon from "../../assets/up_arrow.svg";
import downarrowIcon from "../../assets/down_arrow.svg";

function UniversalTable({ title = "", subtitle = "", columns = [], rows = [], disableSort = false }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleSort = (colKey) => {
        let direction = "ascending";
        if (sortConfig.key === colKey && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key: colKey, direction });
    };

    const sortedRows = React.useMemo(() => {
        if (!sortConfig.key) return rows;
        const sorted = [...rows].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [rows, sortConfig]);

    const renderCell = (col, value, row) => {
        const pillColors = {
            role: {
                Maker: "text-[#03CA9C] bg-[#03CA9C26]",
                Admin: "text-[#8A38F5] bg-[#8A38F526]",
                Super_Admin: "text-[#FF9F0A] bg-[#FF9F0A26]",
            },
            userStatus: {
                Active: "text-[#10B935] bg-[#10B9351A]",
                Inactive: "text-[#EB1D2E] bg-[#EB1D2E1A]",
            },
            type: {
                Buy: "text-green-800 bg-green-100 border-green-800",
                Sell: "text-yellow-800 bg-yellow-100 border-yellow-800",
            },
            dealStatus: {
                Pending: "text-yellow-800 bg-yellow-100",
                Rejected: "text-red-800 bg-red-100",
                Approved: "text-green-800 bg-green-100",
                Closed: "text-gray-800 bg-gray-200",
            },
        };

        if (col.key === "deal_number" || col.key === "full_name") {
            return <span className="text-medium font-bold">{value}</span>;
        }

        if (col.key === "role") {
            const roleName = row.role?.name || value;
            return (
                <span
                    className={`px-4 py-2 text-sm font-medium border ${pillColors.role[roleName] || ""} shadow-sm`}
                    style={{ borderRadius: "7px" }}
                >
                    {roleName}
                </span>
            );
        }


        if (col.key === "status") {
            const statusText = typeof value === "boolean" ? (value ? "Active" : "Inactive") : value;
            return (
                <span className={`px-3 py-1 text-sm font-medium ${pillColors.userStatus[statusText] || ""}`} style={{ borderRadius: "4px" }}>
                    {statusText}
                </span>
            );
        }

        if (col.key === "type") {
            return (
                <span
                    className={`px-4 py-2 text-sm font-medium border ${pillColors.type[value] || ""} shadow-sm`}
                    style={{ borderRadius: "7px" }}
                >
                    {value}
                </span>
            );
        }


        if (col.key === "dealStatus") {
            return (
                <span
                    className={`px-3 py-1 text-sm font-medium ${pillColors.dealStatus[value] || ""}`}
                    style={{ borderRadius: "4px" }}
                >
                    {value}
                </span>
            );
        }

        return value;
    };

    return (
        <div className="bg-white rounded-b-2xl border border-t-0 border-gray-200 pt-0 pr-6 pl-6 pb-2 w-full mr-4">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">

                    <thead>
                        <tr className="text-black text-bold text-[16px]">
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className="py-1 text-left font-medium whitespace-nowrap cursor-pointer select-none"
                                    onClick={() => !disableSort && col.key !== "actions" && handleSort(col.key)}
                                >
                                    <div className="flex items-center">
                                        {col.label}
                                        {!disableSort && col.key !== "actions" && (
                                        <span className="flex ml-1">
                                            <img
                                                src={uparrowIcon}
                                                alt="asc"
                                                className={`w-2 h-3 ${sortConfig.key === col.key && sortConfig.direction === "ascending"
                                                        ? "opacity-100"
                                                        : "opacity-30"
                                                    }`}
                                            />
                                            <img
                                                src={downarrowIcon}
                                                alt="desc"
                                                className={`w-2 h-3 ${sortConfig.key === col.key && sortConfig.direction === "descending"
                                                        ? "opacity-100"
                                                        : "opacity-30"
                                                    }`}
                                            />
                                        </span>
                                    )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                <tbody className="text-sm text-black">
                {sortedRows.length === 0 ? (
                    <tr>
                    <td colSpan={columns.length} className="py-5 text-center text-black">
                        No data available
                    </td>
                    </tr>
                ) : (
                    sortedRows.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className="transition duration-200 hover:bg-gray-100 hover:rounded-lg"
                    >
                        {columns.map((col, colIndex) => {
                        const key = col.key || col.toLowerCase();
                        return (
                            <td
                            key={colIndex}
                            className="py-2.5 px-2 whitespace-nowrap"
                            >
                            {renderCell(col, row[key], row)}
                            </td>
                        );
                        })}
                    </tr>
                    ))
                )}
                </tbody>


                </table>
            </div>

        </div>

    );
}

export default UniversalTable;
