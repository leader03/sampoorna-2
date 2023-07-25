import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getMonth, getReport, getToday, getTop, getYear } from "../services/report";

export const useGetSalesReportQuery = () => {
  return useQuery("report", () => getReport(), {
    onError: (err) => {
      toast.error("Error Getting Sales!");
    },
  });
};

export const useGetSalesTopQuery = () => {
  return useQuery("topreport", () => getTop(), {
    onError: (err) => {
      toast.error("Error Getting Sales!");
    },
  });
};

export const useGetSalesDayQuery = () => {
  return useQuery("today", () => getToday(), {
    onError: (err) => {
      toast.error("Error Getting Sales!");
    },
  });
};

export const useGetSalesMonthQuery = () => {
  return useQuery("month", () => getMonth(), {
    onError: (err) => {
      toast.error("Error Getting Sales!");
    },
  });
};

export const useGetSalesYearQuery = () => {
  return useQuery("year", () => getYear(), {
    onError: (err) => {
      toast.error("Error Getting Sales!");
    },
  });
};
