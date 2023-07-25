import axiosClient from "../utils/useAxios";

export const getBooks = () => {
  return axiosClient.get(`store/all/books`);
};

export const createOrder = (payload) => {
  return axiosClient.post("/store/create/sale", payload);
};

export const editOrder = (id,payload) => {
  return axiosClient.patch(`store/edit/sales/${id}`, payload)
}
