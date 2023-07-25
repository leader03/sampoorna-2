import React from "react";

const BookItemSkeleton = () => {
  const stockColor = "text-gray-700 bg-gray-100";
  const borderStyle = "border-gray-200 bg-white";

  return (
    <div className={`animate-pulse px-3 py-2 flex flex-col border ${borderStyle} rounded-md h-auto justify-between duration-200 cursor-default`}>
      <div className="flex justify-between items-center">
        <span className={`w-12 h-4 rounded ${stockColor}`}></span>
        <span className="w-16 h-4 self-end rounded"></span>
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="w-20 h-4 font-semibold rounded bg-gray-200"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default BookItemSkeleton;
