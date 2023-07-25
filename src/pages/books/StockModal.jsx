import React, { useState } from "react";

const StockModal = ({ handleAddStock, handleCancel }) => {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddStock(quantity);
    setQuantity(0);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full"
            placeholder="Quantity"
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded"
            >
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
