import React, { useState } from "react";
import SalesTable from "./SalesTable";
import Pagination from "../../components/Pagination";
import {
  useDeleteSale,
  useDeleteSales,
  useGetSalesQuery,
} from "../../query/salesQuery";
import EditSales from "./EditSales";
import Shimmer from "../../components/loader/shimmer";

const Sales = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useGetSalesQuery(currentPage);
  const totalPageNumber = data?.data?.total_page_number;
  const { mutate } = useDeleteSales();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saleIdToDelete, setSaleIdToDelete] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSales, setSelectedSales] = useState(null);

  const handleDelete = (saleId) => {
    setSaleIdToDelete(saleId);
    setShowConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    // await deleteSale(saleIdToDelete);
    mutate(saleIdToDelete);
    setShowConfirmation(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const openViewModal = (book) => {
    setViewModalOpen(true);
  };

  const openEditModal = (book) => {
    setSelectedSales(book);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Bill No", accessor: "bill_no" },
      { Header: "Discount (Rs.)", accessor: "discount" },
      { Header: "Final Amount (Rs.)", accessor: "final_amount" },
      { Header: "Payment", accessor: "payment_method" },
    ],
    []
  );

  React.useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <>
      <div className="w-full bg-white p-4 mt-14">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-slate-600 font-semibold">Sales List</h1>
        </div>
        {isLoading ? (
          <Shimmer />
        ) : (
          <SalesTable
            columns={columns}
            data={data?.data?.sales ?? []}
            handleEdit={openEditModal}
            handleView={openViewModal}
            onDelete={handleDelete}
          />
        )}
      </div>
      {!isLoading && (
        <Pagination
          page={totalPageNumber}
          setPageNo={setCurrentPage}
          pageNo={currentPage}
        />
      )}
      {showConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded w-96">
            <h2 className="text-xl font-medium mb-8 text-center">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded mr-2"
                onClick={handleCancelConfirmation}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-600 text-white py-1 px-3 rounded"
                onClick={handleDeleteConfirmation}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded w-96">
            <h2 className="text-xl font-medium mb-4">Edit Book</h2>
            <EditSales
              handleSubmit={(e) => {
                e.preventDefault();
                const { name, price } = e.target.elements;

                const updatedBook = {
                  ...selectedSales,
                  name: name.value,
                  price: parseFloat(price.value),
                };

                // handleUpdateBook(updatedBook);
              }}
              handleCancel={closeEditModal}
              defaultValues={{
                name: selectedSales.name,
                price: selectedSales.price,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sales;
