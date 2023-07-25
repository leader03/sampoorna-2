import React, { useEffect, useState } from "react";
import BooksTable from "./BooksTable";
import BookForm from "./BookForm";
import "react-toastify/dist/ReactToastify.css";
import StockModal from "./StockModal";
import EditBook from "./EditBook";
import Pagination from "../../components/Pagination";
import {
  useCreateBookQuery,
  useCreateStockQuery,
  useDeleteBookQuery,
  useGetBooksQuery,
  useUpdateBookQuery,
} from "../../query/booksQuery";

const Books = () => {
  const [books] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, refetch } = useGetBooksQuery(currentPage, searchQuery);
  const totalPageNumber = data?.data?.total_page_number;

  const columns = React.useMemo(
    () => [
      { Header: "Book Name", accessor: "name" },
      { Header: "Stock", accessor: "stock" },
      { Header: "Price", accessor: "price" },
    ],
    []
  );

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isStockModalOpen, setStockModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBookToDelete, setSelectedBookToDelete] = useState(null);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const closeStockModal = () => {
    setStockModalOpen(false);
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedBook(null);
    setEditModalOpen(false);
  };

  const handleEdit = (book) => {
    openEditModal(book);
  };

  const { mutate: updateMutate } = useUpdateBookQuery(closeEditModal);
  const { mutate: addMutate } = useCreateBookQuery(closeAddModal);
  const { mutate: stockMutate } = useCreateStockQuery(closeStockModal);
  const { mutate: deleteMutate } = useDeleteBookQuery();

  
  const openDeleteModal = (book) => {
    setSelectedBookToDelete(book);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedBookToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = (bookId) => {
    // Perform the delete operation
    deleteMutate(bookId);
    closeDeleteModal();
  };

  const handleAddBook = (newBook) => {
    const formData = new FormData();
    formData.append("name", newBook.name);
    formData.append("price", newBook.price);
    formData.append("quantity", newBook.quantity);
    addMutate(newBook);
  };

  const handleUpdateBook = (updatedBook) => {
    updateMutate(updatedBook);
  };

  const handleAddStock = (bookId) => {
    setSelectedBookId(bookId);
    setStockModalOpen(true);
  };

  const confirmAddStock = (quantity) => {
    console.log(quantity);
    if (selectedBookId) {
      const payload = {
        id: selectedBookId,
        data: { quantity },
      };
      stockMutate(payload);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, searchQuery]);

  return (
    <>
      <div className="w-full bg-white p-4 mt-14">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-slate-600 font-semibold">
            Book List
          </h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search books"
              className="border border-gray-300 px-2 py-2 rounded"
              onChange={handleSearch}
            />
            <button
              className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded ml-2"
              onClick={openAddModal}
            >
              Add Book
            </button>
          </div>
        </div>
        <BooksTable
          isLoading={isLoading}
          columns={columns}
          data={data?.data?.books ?? []}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAddStock={handleAddStock}
        />
        {!isLoading && (
          <Pagination
            page={totalPageNumber}
            setPageNo={setCurrentPage}
            pageNo={currentPage}
          />
        )}
      </div>
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded w-96">
            <h2 className="text-xl font-medium mb-4">Add Book</h2>
            <BookForm
              handleSubmit={(e) => {
                e.preventDefault();
                const { name, quantity, price } = e.target.elements;
                const newBook = {
                  id: books.length + 1,
                  name: name.value,
                  quantity: parseInt(quantity.value),
                  price: parseFloat(price.value),
                };

                handleAddBook(newBook);
              }}
              handleCancel={closeAddModal}
              defaultValues={{ name: "", quantity: "", price: "" }}
            />
          </div>
        </div>
      )}

      {isStockModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded w-96">
            <h2 className="text-xl font-medium mb-4">Add Stock</h2>
            <StockModal
              handleAddStock={confirmAddStock}
              handleCancel={closeStockModal}
            />
          </div>
        </div>
      )}

      {isEditModalOpen && selectedBook && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded w-96">
            <h2 className="text-xl font-medium mb-4">Edit Book</h2>
            <EditBook
              handleSubmit={(e) => {
                e.preventDefault();
                const { name, price } = e.target.elements;

                const updatedBook = {
                  ...selectedBook,
                  name: name.value,
                  price: parseFloat(price.value),
                };

                handleUpdateBook(updatedBook);
              }}
              handleCancel={closeEditModal}
              defaultValues={{
                name: selectedBook.name,
                price: selectedBook.price,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
