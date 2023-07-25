import React from "react";

const InvoiceModal = ({
  componentRef,
  name,
  phone,
  bill_no,
  address,
  orderitem,
  subtotal,
  total,
  discount,
  closeAddModal,
  handlePrint,
}) => (
  // <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
  //   <div className="container mx-auto p-8 w-1/2">
  //     <div className="bg-white rounded-lg shadow-lg">
        
  //       <div className="px-6 py-4" ref={componentRef}>
  //         <div className="flex justify-between items-center">
  //           <div className="text-3xl font-bold">Invoice</div>
  //           <div className="text-sm text-gray-500">
  //             Date: {new Date().toLocaleDateString()}
  //           </div>
  //         </div>
  //         <div className="mt-4">
  //           <div className="flex justify-between">
  //             <div>
  //               <div className="font-bold">Customer:</div>
  //               <div>{name}</div>
  //               <div className="font-bold">Address:</div>
  //               <div>{address}</div>
  //               <div className="font-bold">Phone:</div>
  //               <div>{phone}</div>
  //             </div>

  //             <div>
  //               <div className="font-bold">Bill No:</div>
  //               <div>{bill_no}</div>
  //             </div>
  //           </div>
  //           <div className="mt-4">
  //             <table className="w-full">
  //               <thead>
  //                 <tr className="border-b border-dashed border-gray-500 text-left">
  //                   <th className="py-2 px-4">Book</th>
  //                   <th className="py-2 px-4">Quantity</th>
  //                   <th className="py-2 px-4">Price</th>
  //                   <th className="py-2 px-4">Total</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {orderitem.map((item, index) => (
  //                   <tr key={index} className="border-b border-dashed border-gray-500 text-left">
  //                     <td className="py-2 px-4">{item.name}</td>
  //                     <td className="py-2 px-4">{item.quantity}</td>
  //                     <td className="py-2 px-4">Rs. {item.price}</td>
  //                     <td className="py-2 px-4">
  //                       Rs. {item.price * item.quantity}
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //           <div className="mt-4">
  //             <div className="flex justify-end">
  //               <div className="flex flex-col w-64">
  //                 <div className="flex justify-between">
  //                   <div>Subtotal:</div>
  //                   <div>Rs. {subtotal}</div>
  //                 </div>
  //                 <div className="flex justify-between">
  //                   <div>Discount:</div>
  //                   <div>Rs. {discount}</div>
  //                 </div>
  //                 <div className="flex justify-between">
  //                   <div className="font-bold">Total:</div>
  //                   <div className="font-bold">Rs. {total}</div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="px-6 py-4 bg-gray-100">
  //         <div className="flex justify-end gap-4">
  //           <button
  //             type="button"
  //             className="bg-gray-300 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
  //             onClick={closeAddModal}
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             type="button"
  //             className="bg-slate-700 hover:bg-slate-600 text-gray-100 py-2 px-4 rounded-md"
  //             onClick={handlePrint}
  //           >
  //             Print
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>




  

  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
     <div className="container mx-auto p-8 w-1/2">
       <div className="bg-white rounded-lg shadow-lg">
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
                <>
                  <p>Name: {name}</p>
                  <p>Phone: {phone}</p>
                  <p>Address: {address}</p>
                </>
            </div>
            <div>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Bill No: {new Date().toLocaleDateString()+ "_" + new Date().toLocaleTimeString().slice(0,7)}</p>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-dashed border-gray-500 text-left">
                <th className="py-2 px-4 bg-gray-100 text-left">Book</th>
                <th className="py-2 px-4 bg-gray-100 text-left">Quantity</th>
                <th className="py-2 px-4 bg-gray-100 text-left">Price</th>
                <th className="py-2 px-4 bg-gray-100 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderitem?.map((item, index) => (
                <tr key={index} className="border-b border-dashed border-gray-500 text-left">
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">Rs. {item.price}</td>
                  <td className="py-2 px-4">
                     Rs. {item.price * item.quantity}
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col mt-4 items-end justify-start">
            {/* <p>Payment Method: {payment_method}</p> */}
            <p>Discount (Rs.): {discount}</p>
            <p>Final Amount (Rs.): {total}</p>
          </div>
        </div>
        <div className="flex justify-end gap-4 px-6 py-4">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
            onClick={closeAddModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-slate-700 hover:bg-slate-600 text-gray-100 py-2 px-4 rounded-md"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
        
    </div>
    </div>
);

export default InvoiceModal;
