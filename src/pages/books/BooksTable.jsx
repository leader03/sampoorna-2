import React from "react";
import { Link } from "react-router-dom";
import BookActions from "./BookActions";
import Shimmer from "../../components/loader/shimmer";

const BooksTable = ({
  columns,
  data,
  handleEdit,
  handleAddStock,
  handleDelete,
  isLoading,
}) => {
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
          <th className="py-2 px-4 bg-gray-100 text-gray-600 text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={4}>
              <Shimmer />
            </td>
          </tr>
        ) : (
          data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:shadow cursor-pointer">
              {columns?.map((column, columnIndex) => {
                if (column.accessor === "name") {
                  return (
                    <td
                      key={columnIndex}
                      className="py-3 px-4 border-b border-gray-200 text-slate-600 font-semibold "
                    >
                      <Link to={`/books/${row.id}`}>
                        {row[column.accessor]}{" "}
                      </Link>
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={columnIndex}
                      className="py-3 px-4 border-b border-gray-200 text-gray-600 text-sm"
                    >
                      {row[column.accessor]}
                    </td>
                  );
                }
              })}
              <td className="py-3 px-4 border-b border-gray-200 text-gray-600 text-sm">
                <BookActions
                  book={row}
                  handleEdit={handleEdit}
                  handleAddStock={handleAddStock}
                  handleDelete={handleDelete}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default BooksTable;
