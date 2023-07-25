import axiosClient from "../utils/useAxios";

export const getBooks = (page) => {
  return axiosClient.get(`/store/books?page=${page}`);
};

export const createBooks = (payload) => {
  return axiosClient.post("/store/books", payload);
};

export const editBooks = (id, payload) => {
  return axiosClient.put(`/store/book/detail/${id}`, payload);
};

export const deleteBook = (id) => {
  return axiosClient.delete(`/store/book/detail/${id}`);
};

export const addStock = (id, payload) => {
  return axiosClient.post(`/store/addstock/${id}`, payload);
};

export const bookDetail = (id) => {
  return axiosClient.get(`/store/book/detail/${id}`);
};

export const stockDetail = (id) => {
  return axiosClient.get(`/store/book/stock/${id}`);
};
