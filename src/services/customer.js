import axiosClient from "../utils/useAxios";

export const getCustomer = (page) => {
  return axiosClient.get(`/store/customers?page=${page}`);
};

export const customerDetail = (id) => {
    return axiosClient.get(`/store/customer/detail/${id}`);
  };