import React from "react";

const OrderItem = ({
  name,
  quantity,
  price,
  updateQuantity,
  decreaseQuantity,
  increaseQuantity,
}) => (
  <div className="flex flex-row justify-between items-center py-2 border-b border-gray-300 overflow-y-auto">
    <div className="flex flex-col">
      <span className="ml-1 text-sm">{name}</span>
      <span className="ml-1 text-sm font-semibold">Rs. {price}</span>
    </div>
    <div className="w-32 flex justify-between">
      <button
        className="px-2 rounded bg-gray-50 border border-gray-300"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <input
        type="number"
        className="w-12 rounded bg-gray-50 border border-gray-300 text-center font-semibold"
        value={quantity}
        onChange={(e) => {
          const newQuantity = parseInt(e.target.value);
          if (!isNaN(newQuantity) && newQuantity >=1) {
            updateQuantity(newQuantity);
          }
        }}
      />
      <button
        className="px-2 rounded bg-gray-50 border border-gray-300"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  </div>
);

export default OrderItem;
