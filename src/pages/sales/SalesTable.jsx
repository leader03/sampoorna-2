import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const SalesTable = ({ columns, data, onDelete, handleEdit, handleView }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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
          <th className="py-2 px-4 bg-gray-100 text-gray-600 text-left">Actions</th>
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
                {column.accessor === 'date' ? (
                  <Link to={`/sale/${row.id}`}>{formatDate(row[column.accessor])}</Link>
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
            <td className="py-3 px-4 border-b border-gray-200 text-gray-600 text-sm">
              <div className="flex gap-2">
                <Link to={`/sale/${row.id}`}>
              <button
                  className="text-blue-500 border p-1 border-blue-400 rounded text-center"
                  onClick={handleView}
                >
                  <FaEye />
                </button>
                </Link>
                <Link to={`/billing?id=${row.id}`}>
                <button
                  className="text-blue-500 border p-1 border-blue-400 rounded text-center"
                  // onClick={handleEdit}
                >
                  <FaEdit />
                </button>
                </Link>
                <button
                  className="text-red-500 border p-1 border-red-400 rounded text-center"
                  onClick={() => onDelete(row.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;
