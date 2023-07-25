import React from "react";

const DeleteConfirmationModal = ({ book, onDelete, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-xl font-medium mb-4">Delete Book</h2>
        <p className="mb-4">Are you sure you want to delete this book?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md mr-2"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
