import React from "react";

function UniversalTable({
    title = "",
    subtitle = "",
    columns = [],
    rows = [],
}) {
    const renderCell = (col, value) => {
        const pillColors = {
            type: {
                Buy: "text-green-800 bg-green-100 border-green-800",
                Sell: "text-yellow-800 bg-yellow-100 border-yellow-800",
            },
            status: {
                Pending: "text-yellow-800 bg-yellow-100",
                Rejected: "text-red-800 bg-red-100",
                Approved: "text-green-800 bg-green-100",
                Closed: "text-gray-800 bg-gray-200",
            },
        };
        if (col.key === "type" && pillColors.type[value]) {
            return (
                <span
                    className={`px-4 py-2 text-sm font-medium border ${pillColors.type[value]} shadow-sm`}
                    style={{ borderRadius: "7px" }}
                >
                    {value}
                </span>
            );
        }


        if (col.key === "status" && pillColors.status[value]) {
            return (
                <span
                    className={`px-3 py-1 text-sm font-medium ${pillColors.status[value]}`}
                    style={{ borderRadius: "4px" }}
                >
                    {value}
                </span>
            );
        }

        return value;
    };

    return (

        <div className="bg-white rounded-b-2xl border border-t-0 border-gray-200 p-6 w-full">
            {title && (
                <h2 className="text-[20px] font-semibold text-black-900">{title}</h2>
            )}
            {subtitle && (
                <p className="text-sm text-black-500 mb-4">{subtitle}</p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">

                    <thead>
                        <tr className="text-black text-bold text-[16px]">
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className="py-3 text-left font-medium whitespace-nowrap"
                                >
                                    {col.label || col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-sm text-black">
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-5 text-center text-black"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-gray-50 transition"
                                >
                                    {columns.map((col, colIndex) => {

                                        const key = col.key || col.toLowerCase();

                                        return (
                                            <td key={colIndex} className="py-4 whitespace-nowrap">
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
