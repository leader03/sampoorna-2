import React from "react";
import { useParams } from "react-router-dom";
import { useGetSaleDetailQuery } from "../../query/salesQuery";
import { useReactToPrint } from "react-to-print";

const SalesDetail = () => {
  const { id } = useParams();
  const { data } = useGetSaleDetailQuery(id);
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const {
    customer,
    date,
    bill_no,
    orderitem,
    discount,
    final_amount,
    payment_method,
  } = data?.data ?? [];

  return (
    <div className="container mx-auto p-8 mt-14 ">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-8" ref={componentRef}>
          <div className="mb-4">
            <h3 className="text-4xl font-semibold text-center">
              Sampurna Kitab
            </h3>
            <div className="flex gap-4 justify-center">
              <p>Bharatpur-02, Chitwan</p>
              <p>9876543210</p>
            </div>
          </div>
          <div className="flex justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold">Customer Details</h3>
              {customer && (
                <>
                  <p>Name: {customer.name}</p>
                  <p>Phone: {customer.phone}</p>
                  <p>Address: {customer.address}</p>
                </>
              )}
            </div>
            <div>
              <p>Date: {formatDate(date)}</p>
              <p>Bill No: {bill_no}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 text-left">
                  Product Name
                </th>
                <th className="py-2 px-4 bg-gray-100 text-left">Quantity</th>
                <th className="py-2 px-4 bg-gray-100 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderitem?.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.product.name}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">Rs. {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col mt-4 items-end justify-start">
            <p>Payment Method: {payment_method}</p>
            <p>Discount (Rs.): {discount}</p>
            <p>Final Amount (Rs.): {final_amount}</p>
          </div>
        </div>
      </div>
      <button
        className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded mt-4 float-right"
        onClick={handlePrint}
      >
        Print Invoice
      </button>
    </div>
  );
};

export default SalesDetail;
