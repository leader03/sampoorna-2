import React from "react";
import {
  FaBook,
  FaCalendar,
  FaCalendarDay,
  FaChartBar,
  FaChartLine,
  FaClipboard,
  FaClock,
  FaDollarSign,
  FaEquals,
  FaSortNumericUp,
} from "react-icons/fa";
import LineChart from "../../components/chart/chartjs/LineChart";
import {
  useGetSalesDayQuery,
  useGetSalesMonthQuery,
  useGetSalesReportQuery,
  useGetSalesTopQuery,
  useGetSalesYearQuery,
} from "../../query/reportQuery";
import BarChart from "../../components/chart/chartjs/Bar";

const Report = () => {
  const { data: reportData } = useGetSalesReportQuery();
  const { data: topSellingBooksData } = useGetSalesTopQuery();
  const { data: todaysSales } = useGetSalesDayQuery();
  const { data: monthlySales } = useGetSalesMonthQuery();
  const { data: yearlySales } = useGetSalesYearQuery();

  const report = reportData?.data ?? {};
  const topSellingBooks = topSellingBooksData?.data?.best_selling_books ?? [];
  const todays = todaysSales?.data ?? {};
  const monthly = monthlySales?.data ?? {};
  const yearly = yearlySales?.data ?? {};
  const todaysSalesAmount = todays.total ?? 0;
  const monthlySalesAmount = monthly.total ?? 0;
  const yearlySalesAmount = yearly.total ?? 0;
  const percentageChange = todays.percentage_change ?? 0;
  const percentageChangeMonthly = monthly.percentage_change ?? 0;
  const percentageChangeYearly = yearly.percentage_change ?? 0;
  const totalSalesCash = report.total_sold_cash ?? 0;
  const totalSalesCredit = report.total_sold_credit ?? 0;
  const totalSalesMobileBanking = report.total_sold_mobile_banking ?? 0;
  // const previous_total = todays.previous_total ?? 0;

  return (
    <div className="container mx-auto pb-10 mt-20">
      <h1 className="text-2xl text-slate-600 font-semibold mb-4">
        Sales Report
      </h1>
      <div className="grid grid-cols-4 gap-4 mb-2">
        <div className="bg-white border border-slate-300 p-4 rounded-lg flex items-center">
          <FaCalendarDay className="text-4xl mr-4 text-fuchsia-400 bg-fuchsia-100 p-2 rounded" />
          <div className="flex  items-center">
            <div className="flex flex-col items-start">
              <h2 className="text-slate-700 font-semibold">Today's Sales</h2>
              <p className="font-semibold">Rs. {todaysSalesAmount}</p>
              {/* <p className="font-semibold">Rs. {previous_total}</p> */}
            </div>
            {percentageChange !== null && (
              <div className="text-sm font-semibold flex ml-8 items-end">
                {percentageChange > 0 ? (
                  <span className="text-green-500 bg-green-100 p-1 rounded">
                    <span>&#8593;</span>
                    <span>{percentageChange.toFixed(0)}%</span>
                  </span>
                ) : percentageChange < 0 ? (
                  <span className="text-red-500 bg-red-100 p-1 rounded">
                    <span>&#8595;</span>
                    <span>{Math.abs(percentageChange.toFixed(0))}%</span>
                  </span>
                ) : (
                  <span className="text-gray-500 bg-gray-100 p-1 rounded">
                    <FaEquals />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="bg-white border border-slate-300 p-4 rounded-lg flex items-center">
          <FaClock className="text-4xl mr-4 text-teal-400 bg-teal-100 p-2 rounded" />
          <div>
            <h2 className="text-slate-700 font-semibold">Monthly Sales</h2>
            <p className=" font-semibold">Rs. {monthlySalesAmount}</p>
          </div>
          {percentageChangeMonthly !== null && (
            <div className="text-sm font-semibold flex ml-8 items-end">
              {percentageChangeMonthly > 0 ? (
                <span className="text-green-500 bg-green-100 p-1 rounded">
                  <span>&#8593;</span>
                  <span>{percentageChangeMonthly.toFixed(0)}%</span>
                </span>
              ) : percentageChangeMonthly < 0 ? (
                <span className="text-red-500 bg-red-100 p-1 rounded">
                  <span>&#8595;</span>
                  <span>{Math.abs(percentageChangeMonthly.toFixed(0))}%</span>
                </span>
              ) : (
                <span className="text-gray-500 bg-gray-100 p-1 rounded">
                  <FaEquals />
                </span>
              )}
            </div>
          )}
        </div>
        <div className="bg-white border border-slate-300 p-4 rounded-lg flex items-center">
          <FaCalendar className="text-4xl mr-4 text-pink-400 bg-pink-100 p-2 rounded" />
          <div>
            <h2 className="text-slate-700 font-semibold">Yearly Sales</h2>
            <p className=" font-semibold">Rs. {yearlySalesAmount}</p>
          </div>
          {percentageChangeYearly !== null && (
            <div className="text-sm font-semibold flex ml-8 items-end">
              {percentageChangeYearly > 0 ? (
                <span className="text-green-500 bg-green-100 p-1 rounded">
                  <span>&#8593;</span>
                  <span>{percentageChangeYearly.toFixed(0)}%</span>
                </span>
              ) : percentageChangeYearly < 0 ? (
                <span className="text-red-500 bg-red-100 p-1 rounded">
                  <span>&#8595;</span>
                  <span>{Math.abs(percentageChangeYearly.toFixed(0))}%</span>
                </span>
              ) : (
                <span className="text-gray-500 bg-gray-100 p-1 rounded">
                  <FaEquals />
                </span>
              )}
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-300 p-4 rounded-lg flex items-center">
          <FaDollarSign className="text-4xl mr-4 text-orange-400 bg-orange-100 p-2 rounded" />
          <div>
            <h2 className="text-slate-700 font-semibold">Total Revenue</h2>
            <p className=" font-semibold">Rs. {report.final_total_sales}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white px-4 py-4 mt-8 rounded-lg border border-slate-200">
          <h2 className="text-2xl text-slate-600 font-semibold mb-4">
            Top Selling Books
          </h2>
          <LineChart topSellingBooks={topSellingBooks} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="bg-white px-4 py-4 mt-8 rounded-lg border border-slate-200">
          <h2 className="text-2xl text-slate-600 font-semibold mb-4">
            Payment Methods
          </h2>
          {/* <PollerAreaChart data={topSellingBooks} /> */}
          {/* <RadarChart topSellingBooks={topSellingBooks} /> */}
          <BarChart
            totalSalesCash={totalSalesCash}
            totalSalesCredit={totalSalesCredit}
            totalSalesMobileBanking={totalSalesMobileBanking}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-2 mt-8">
          <div className="bg-white border border-slate-300 p-4 rounded-lg flex items-center">
            <FaChartBar className="text-4xl mr-4 text-rose-400 bg-rose-100 p-2 rounded" />
            <div className="flex  items-center">
              <div className="flex flex-col items-start">
                <h2 className="text-slate-700 font-semibold">Total Sales</h2>
                <p className="font-semibold">
                  Rs. {report.total_sold_without_discount}
                </p>
                {/* <p className="font-semibold">Rs. {previous_total}</p> */}
              </div>
            </div>
          </div>
          <div className="bg-white border border-slate-300 p-4 rounded-lg flex items-center">
            <FaSortNumericUp className="text-4xl mr-4 text-emerald-400 bg-emerald-100 p-2 rounded" />
            <div>
              <h2 className="text-slate-700 font-semibold">Total Book Items</h2>
              <p className=" font-semibold">{report.total_book_items}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-300 p-4 rounded-lg flex items-center ">
            <FaChartLine className="text-4xl mr-4 text-indigo-400 bg-indigo-100 p-2 rounded" />
            <div>
              <h2 className="text-slate-700 font-semibold">Total Books Sold</h2>
              <p className=" font-semibold">{report.total_sold_quantity}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-300 p-4 rounded-lg flex items-center">
            <FaBook className="text-4xl mr-4 text-green-400 bg-green-100 p-2 rounded" />
            <div>
              <h2 className="text-slate-700 font-semibold">
                Total Books in Stock
              </h2>
              <p className=" font-semibold">{report.total_book_in_stock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
