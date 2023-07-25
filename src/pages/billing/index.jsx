import React, { useState, useEffect, useRef, useMemo } from "react";
import BookItem from "./BookItem";
import OrderItem from "./OrderItem";
import InvoiceModal from "./InvoiceModal";
import { useReactToPrint } from "react-to-print";
import { toast, ToastContainer } from "react-toastify";
import {
  useCreateOrderQuery,
  useGetBooksQuery,
  useUpdateOrderQuery,
} from "../../query/billingQuery";
import { useGetSaleDetailQuery } from "../../query/salesQuery";
import axiosClient from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";

const Billing = () => {

  const searchParams = new URLSearchParams(window.location.search);
  const salesId = searchParams.get('id')
  const { data: saleDetail } = useGetSaleDetailQuery(salesId)
  console.log(saleDetail);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");




  useMemo(() => {
    const saleData = saleDetail?.data
    const updatedData = saleData?.orderitem?.map(item => {
      return {
        id: item.product.id,
        deleted: item.product.deleted,
        is_available: item.product.is_available,
        name: item.product.name,
        price: item.product.price,
        stock: item.product.stock,
        quantity: item.quantity
      }
    })
    updatedData && setOrderItems(updatedData)
    setName(saleDetail?.data?.customer.name)
    setPhone(saleDetail?.data?.customer.phone)
    setAddress(saleDetail?.data?.customer.address)
    updatedData && setDiscount(saleDetail?.data?.discount)
    setPaymentMethod(saleDetail?.data?.payment_method)
    // updatedData && setSubtotal(saleDetail?.data?.total_amount)
  }, [saleDetail?.data?.orderitem])

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    clearOrder();
    setAddress("");
    setName("");
    setPhone("");
    navigate("/sales")
  };

  const { data } = useGetBooksQuery();

  // useEffect(() => {
  //   const storedOrderItems = JSON.parse(localStorage.getItem("orderItems"));
  //   if (storedOrderItems) {
  //     setOrderItems(storedOrderItems);
  //   }
  // }, []);

  useEffect(() => {
    // localStorage.setItem("orderItems", JSON.stringify(orderItems));
    calculateSubtotal();
    calculateTotal();
  }, [orderItems]);

  const addToOrder = (book) => {
    const existingItemIndex = orderItems?.findIndex(
      (item) => item.name === book.name
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += 1;
      setOrderItems(updatedItems);
    } else {
      const newItem = { ...book, quantity: 1 };
      setOrderItems([...orderItems, newItem]);
    }

    calculateSubtotal();
    calculateTotal();
  };

  const calculateSubtotal = () => {
    const calculatedSubtotal = orderItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
  };

  const removeFromOrder = (book) => {
    const existingItemIndex = orderItems.findIndex(
      (item) => item.name === book.name
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...orderItems];
      if (updatedItems[existingItemIndex].quantity === 1) {
        updatedItems.splice(existingItemIndex, 1);
      } else {
        updatedItems[existingItemIndex].quantity -= 1;
      }
      setOrderItems(updatedItems);
    }

    calculateTotal();
  };

  const clearOrder = () => {
    setOrderItems([]);
    calculateTotal();
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...orderItems];
    updatedItems[index].quantity += 1;
    setOrderItems(updatedItems);
    calculateTotal();
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...orderItems];
    if (updatedItems[index].quantity === 1) {
      updatedItems.splice(index, 1);
    } else {
      if(updatedItems[index].quantity >= 1) {
        updatedItems[index].quantity -= 1;
      }
    }
    setOrderItems(updatedItems);
    calculateTotal();
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedItems = [...orderItems];
    updatedItems[index].quantity = newQuantity;
    setOrderItems(updatedItems);
    calculateTotal();
  };

  const calculateTotal = () => {
    const calculatedTotal = orderItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: clearOrder, // Clear order items after printing
  });

  const isItemAddedToOrder = (itemId) => {
    return orderItems?.some((item) => item.id === itemId);
  };
  const filteredBookItems = data?.data?.filter((book) => {
    const query = searchQuery ? searchQuery.toLowerCase() : "";
    const name = book && book.name ? book.name.toLowerCase() : "";
    return name.includes(query);
  });

  const { mutate: orderMutate } = useCreateOrderQuery();
  const { mutate: editOrder } = useUpdateOrderQuery()
  const navigate = useNavigate()






  const postOrderItemsToBackend = () => {
    const salesData = {
      name,
      sales_items: orderItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
      discount,
      payment_method: paymentMethod ? paymentMethod : "Cash",
      address: address || "Nepal",
    };

    const editedSalesData = {
      discount: discount,
      payment_method: paymentMethod ? paymentMethod : "Cash",
      sales_items: orderItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      }))
    }

    if (phone) {
      salesData.phone = phone;
    }

    if (salesId) {
      axiosClient.patch(`store/edit/sales/${salesId}`, editedSalesData).then(() => {
        openAddModal();
      })
      // editOrder(salesId,editedSalesData)
    }
    else {
      axiosClient.post("/store/create/sale", salesData).then(() => {
        openAddModal();
      })
      // orderMutate(salesData);
    }
  };




  const handleInvoiceClick = () => {
    if (orderItems.length === 0) {
      toast.error("Cart is empty");
    } else if (!name) {
      toast.error("Please Enter The Customer Name!");
    } else {
      postOrderItemsToBackend();
      // openAddModal();
    }
  };

  const [disErr, setDisErr] = useState(false)

  const handleDiscountChange = (e) => {
    setDisErr(false)
    const enteredDiscount = parseInt(e.target.value);
    console.log(enteredDiscount);
    if (enteredDiscount <= subtotal) {
      setDisErr(false)
      setDiscount(enteredDiscount);
    } 
    else if(enteredDiscount >= subtotal) {
      setDisErr(true)
      setDiscount(subtotal)   
    }
    else {
      setDisErr(false)
      setDiscount(enteredDiscount)   
    }
  };

  return (
    <div className="container mx-auto bg-white overflow-hidden  mt-16">
      <div className="flex lg:flex-row flex-col gap-4 shadow  ">
        <div className="w-full lg:w-[80%] min-h-screen  overflow-y-auto">
          <div className="flex gap-4 bg-gray-100 w-[100] p-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full"
              placeholder="Customer Name"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full"
              placeholder="Phone Number"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full"
              placeholder="Address"
            />
          </div>

          <div className="mx-5 mt-5 w-[100]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 mb-5 w-full"
              placeholder="Search by name of book"
            />
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 py-3 rounded-lg bg-slate-100 "
            style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
          >
            {filteredBookItems?.map((book, index) => (
              <BookItem
                key={index}
                {...book}
                addToOrder={() => addToOrder(book)}
                isAddedToOrder={isItemAddedToOrder(book.id)}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[25%] min-h-screen bg-slate-100 px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Billing</div>
            <button
              className="px-4 py-2 text-sm text-red-600"
              onClick={clearOrder}
            >
              Clear Order
            </button>
          </div>
          <hr />
          <div className="mt-2 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 340px)' }}>
            {orderItems?.map((item, index) => (
              <OrderItem
                key={index}
                {...item}
                decreaseQuantity={() => decreaseQuantity(index)}
                increaseQuantity={() => increaseQuantity(index)}
                updateQuantity={(newQuantity) =>
                  updateQuantity(index, newQuantity)
                }
              />
            ))}
          </div>
          <div className=" bg-slate-100">
            <div className="pt-2">
              <div className="flex justify-between">
                <span className="text-lg ">Subtotal:</span>
                <span className="text-lg">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between gap-2 mt-2 items-center">
                <span className="text-lg ">Discount:</span>
                <input
                  type="number"
                  value={salesId && discount}
                  onChange={handleDiscountChange}
                  className="border border-gray-300 rounded-md w-full px-4 py-2"
                  placeholder="Discount Amount"
                />
              </div>
              {disErr &&
                <div className="">
                  <span className="text-xs text-red-500 ">Discount can't be more than total.</span>
                </div>
              }
              <div className="flex justify-between mt-2">
                <span className="text-lg ">Total:</span>
                <span className="text-lg">Rs. {discount ? total - discount : total}</span>
              </div>
            </div>
            <div className="mt-5">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="Cash">Cash</option>
                <option value="unpaid">Unpaid</option>
                <option value="Mobile_banking">Mobile Banking</option>
              </select>
            </div>
            <div className="mt-5">
              <button
                className="px-4 py-2 bg-slate-700 text-white font-semibold rounded-md w-full"
                onClick={handleInvoiceClick}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <InvoiceModal
          name={name}
          componentRef={componentRef}
          bill_no={saleDetail?.data?.bill_no}
          phone={phone}
          address={address}
          orderitem={orderItems}
          subtotal={subtotal}
          discount={discount}
          total={total - discount}
          closeAddModal={closeAddModal}
          handlePrint={handlePrint}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Billing;
