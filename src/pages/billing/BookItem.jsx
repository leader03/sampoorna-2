import React from "react";
import { FaCartPlus } from "react-icons/fa";

const BookItem = ({ name, price, stock, addToOrder, isAddedToOrder }) => {
  const stockColor =
    stock === 0
      ? "text-red-700 bg-red-100"
      : stock < 10
      ? "text-yellow-700 bg-yellow-100"
      : "text-gray-700 bg-gray-100";
  const borderStyle = isAddedToOrder ? "border-green-500 bg-green-100" : "border-gray-200 bg-white";

  // Show skeleton loading effect when book data is not available (isLoading)
  if (!name || !price || !stock) {
    return (
      <div
        className={`px-3 py-2 flex flex-col border ${borderStyle} rounded-md h-auto justify-between duration-200 hover:-translate-y-1 hover:shadow cursor-pointer`}
      >
        <div className="animate-pulse bg-gray-200 h-4 w-24 rounded-md"></div>
        <div className="animate-pulse bg-gray-200 h-8 mt-2 rounded-md"></div>
      </div>
    );
  }

  return (
    <div
      className={`px-3 py-2 flex flex-col border ${borderStyle} rounded-md h-auto justify-between duration-200 hover:-translate-y-1 hover:shadow cursor-pointer`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`text-[12px] w-fit px-1 rounded font-semibold ${stockColor}`}
        >
          Stock: {stock}
        </span>
        <span className="self-end text-[12px] font-semibold text-gray-700">
          Rs. {price}
        </span>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="font-semibold text-sm text-gray-800">{name}</div>
        {stock > 0 && (
          <button
            className="px-2 py-1 rounded bg-gray-600 text-white font-semibold"
            onClick={addToOrder}
          >
            <FaCartPlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookItem;
