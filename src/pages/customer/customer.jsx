import React, { useEffect, useState } from "react";
import CustomerTable from "./CustomerTable";
import Pagination from "../../components/Pagination";
import { useGetCustomerQuery } from "../../query/customerQuery";

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useGetCustomerQuery(currentPage);
  const totalPageNumber = data?.data?.total_page_number;
  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Address", accessor: "address" },
    ],
    []
  );
  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <>
      <div className="w-full bg-white p-4 mt-14">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-slate-600 font-semibold">Customers List</h1>
        </div>
        <CustomerTable columns={columns} data={data?.data?.customer ?? []} />
      </div>
      {!isLoading && (
        <Pagination
          page={totalPageNumber}
          setPageNo={setCurrentPage}
          pageNo={currentPage}
        />
      )}
    </>
  );
};

export default Customer;