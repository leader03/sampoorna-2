import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const { logoutUser } = useContext(AuthContext);
  const [isModalOpen,setIsModalOpen] = useState(false)

  const HandleLogout = () => {
    setIsModalOpen(true)
    logoutUser();
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  return (
    <>
    <nav className="bg-gray-50 border-gray-200 mx-2  py-2.5 rounded fixed top-0 left-0 right-0 ">
      <div className="container flex justify-between items-center mx-auto pt-3">
        <span className="text-xl  font-medium ">Sampurna Kitab</span>
        <div className="flex items-center mx-auto">
          <span className="text-xl font-medium whitespace-nowrap ">
            {time.toLocaleTimeString()}
          </span>
        </div>
        <div
          onClick={openModal}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaSignOutAlt />
          Logout
        </div>
      </div>
    </nav>
    {isModalOpen && 
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-xl font-medium mb-8 text-center">Are you sure want to Logout?</h2>
        <div className="flex justify-center">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded mr-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-600 text-white py-1 px-3 rounded"
          onClick={HandleLogout}
        >
          Logout
        </button>
      </div>
      </div>
    </div>
    }
    </>
  );
};

export default Navbar;
