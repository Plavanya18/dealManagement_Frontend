import React from "react";

function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
      <table className="w-full text-left border-collapse">
        
        {/* Table Header */}
        <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-5 py-3 border-b">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-sm text-gray-700">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="px-5 py-3 border-b">
                    {value}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}

export default Table;
