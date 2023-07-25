import React from 'react';

const BookForm = ({ handleSubmit, handleCancel, defaultValues }) => {
  const isUpdateForm = defaultValues.id;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">
          Book Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-gray-300 px-2 py-1 rounded w-full"
          required
          defaultValue={defaultValues.name}
        />
      </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block font-medium mb-1">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="border border-gray-300 px-2 py-1 rounded w-full"
            required
            defaultValue={defaultValues.quantity}
          />
        </div>
      <div className="mb-4">
        <label htmlFor="price" className="block font-medium mb-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="border border-gray-300 px-2 py-1 rounded w-full"
          required
          defaultValue={defaultValues.price}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded mr-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-slate-700 hover:bg-slate-600 text-white py-1 px-3 rounded"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default BookForm;
