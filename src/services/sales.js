import axiosClient from "../utils/useAxios";

export const getSales = (page) => {
  return axiosClient.get(`/store/sales?page=${page}`);
};

export const saleDetail = (id) => {
  if(id) {
    return axiosClient.get(`/store/sale/detail/${id}`);
  }
  else {
    return null
  }
  };

  export const deleteSales = (id) => {
    return axiosClient.delete(`/store/sale/detail/${id}`);
  };
  