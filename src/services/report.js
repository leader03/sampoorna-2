import axiosClient from "../utils/useAxios";

export const getReport = () => {
  return axiosClient.get(`store/report`);
};

export const getTop = () => {
  return axiosClient.get(`store/top10`);
};

export const getToday = () => {
  return axiosClient.get(`store/sales-report?date_filter=day`);
};

export const getMonth = () => {
  return axiosClient.get(`store/sales-report?date_filter=month`);
};

export const getYear = () => {
  return axiosClient.get(`store/sales-report?date_filter=year`);
};