import React from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const BookActions = ({ book, handleEdit, handleDelete, handleAddStock }) => (
  <div className="flex space-x-3 rtl:space-x-reverse">
    <button className="action-btn text-blue-500 border p-1 border-blue-400 rounded text-center" type="button" onClick={() => handleEdit(book)}>
      <FaEdit />
    </button>

    <button className="action-btn text-gray-500 border p-1 border-gray-400 rounded text-center" type="button" onClick={() => handleAddStock(book.id)}>
      <FaPlus />
    </button>

    <button className="action-btn text-red-500 border p-1 border-red-400 rounded text-center" type="button" onClick={() => handleDelete(book.id)}>
      <FaTrash />
    </button>
  </div>
);

export default BookActions;
