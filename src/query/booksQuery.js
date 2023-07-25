import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addStock,
  bookDetail,
  createBooks,
  deleteBook,
  editBooks,
  getBooks,
  stockDetail,
} from "../services/book";
import { toast } from "react-toastify";

export const useGetBooksQuery = (pageno) => {
  return useQuery("books", () => getBooks(pageno,), {
    onError: (err) => {
      toast.error("Error Getting Books!");
    },
  });
};

export const useGetBookStocksQuery = (id) => {
  return useQuery("stock", () => stockDetail(id), {
    onError: (err) => {
      toast.error("Error Getting Books!");
    },
  });
};

export const useGetBookDetailQuery = (id) => {
  return useQuery("booksDetails", () => bookDetail(id), {
    onError: (err) => {
      toast.error("Error Getting Book!");
    },
  });
};

export const useCreateBookQuery = (closeAddModal) => {
  const queryClient = useQueryClient();
  const mutaion = useMutation({
    mutationFn: (payload) => {
      return createBooks(payload);
    },
    onError: (err) => {
      toast.error("Error while adding books");
    },
    onSuccess: (suc) => {
      toast.success("Book Added Sucessfully!");
      closeAddModal(false);
      queryClient.invalidateQueries("books");
    },
  });
  return mutaion;
};

export const useUpdateBookQuery = (closeEditModal) => {
  const queryClient = useQueryClient();
  const mutaion = useMutation({
    mutationFn: (payload) => {
      return editBooks(payload.id, payload);
    },
    onError: (err) => {
      toast.error("Error while updating books");
    },
    onSuccess: (suc) => {
      toast.success("Book Updated Sucessfully!");
      closeEditModal(false);
      queryClient.invalidateQueries("books");
    },
  });
  return mutaion;
};

export const useDeleteBookQuery = () => {
  const queryClient = useQueryClient();
  const mutaion = useMutation({
    mutationFn: (payload) => {
      console.log("papa", payload);
      return deleteBook(payload);
    },
    onError: (err) => {
      toast.error("Error while deleting books");
    },
    onSuccess: (suc) => {
      toast.success("Book Deleted Sucessfully!");
      queryClient.invalidateQueries("books");
    },
  });
  return mutaion;
};

export const useCreateStockQuery = (closeStockModal) => {
  const queryClient = useQueryClient();
  const mutaion = useMutation({
    mutationFn: (payload) => {
      return addStock(payload.id, payload.data);
    },
    onError: (err) => {
      toast.error("Error while adding stock");
    },
    onSuccess: (suc) => {
      toast.success("Stock added Sucessfully!");
      closeStockModal(false);
      queryClient.invalidateQueries("books");
    },
  });
  return mutaion;
};
