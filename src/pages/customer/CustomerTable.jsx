import React from 'react';

const CustomerTable = ({ columns, data }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.Header}
              className="py-2 px-4 bg-gray-100 text-gray-600 text-left"
            >
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:shadow cursor-pointer">
            {columns?.map((column, columnIndex) => (
              <td
                key={columnIndex}
                className="py-3 px-4 border-b border-gray-200 text-gray-600 text-sm"
              >
                {row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;