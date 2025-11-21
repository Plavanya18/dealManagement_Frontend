import React from "react";

function UniversalTable({
    title = "",
    subtitle = "",
    columns = [],
    rows = [],
    renderCell,
}) {
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
                                                {renderCell
                                                    ? renderCell(col, row[key], row)
                                                    : row[key]}
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
