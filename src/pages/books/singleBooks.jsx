import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetBookDetailQuery,
  useGetBookStocksQuery,
} from "../../query/booksQuery";

const BookDetail = () => {
  const { id } = useParams();
  const { data: detailsData, isLoading: detailsLoading } =
    useGetBookDetailQuery(id);
  const { data: stockData, isLoading: stockLoading } =
    useGetBookStocksQuery(id);

  const book = detailsData?.data ?? [];
  const stockHistory = stockData?.data.stock ?? [];

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-16">
      {book && (
        <div>
          <h2 className="text-xl text-slate-600 font-semibold">{book.name}</h2>
          <p className="text-lg">Current Stock: {book.stock}</p>
          <p className="text-lg">Price: Rs. {book.price}</p>
        </div>
      )}

      {stockHistory.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold  text-slate-600 mb-2">
            Stock History
          </h3>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 bg-gray-100 text-gray-600 text-left">
                  Date Added
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 text-left">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {stockHistory?.map((stockItem, index) => (
                <tr key={index} className="hover:shadow cursor-pointer">
                  <td className="py-3 px-4 border-b border-gray-200 text-gray-600 ">
                    {formatDate(stockItem.date_added)}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-gray-600 ">
                    {stockItem.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
