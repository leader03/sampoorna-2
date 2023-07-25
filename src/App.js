import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Billing from "./pages/billing";
import Books from "./pages/books";
import Sales from "./pages/sales/sales";
import Customer from "./pages/customer/customer";
import Layout from "./components/Layout";
import "react-toastify/dist/ReactToastify.css";
import BookDetail from "./pages/books/singleBooks";
import SaleDetail from "./pages/sales/salesDetail";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Report from "./pages/report";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        retryDelay: 5000,
        staleTime: 60000 * 5,
      },
    },
  });

  const token = JSON.parse(localStorage.getItem("authTo"))?.access;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          {/* <Navmenu /> */}
          <Routes>
            <Route path="/report" element={<Report />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/books" element={<Books />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/sale/:id" element={<SaleDetail />} />
          </Routes>
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
