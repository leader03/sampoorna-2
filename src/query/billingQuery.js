import { toast } from "react-toastify";
import { createOrder, editOrder, getBooks } from "../services/billing";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetBooksQuery = () => {
    return useQuery("books", () => getBooks(), {
      onError: (err) => {
        toast.error("Error Getting Books!");
      },
    });
  };

  export const useCreateOrderQuery = (openAddModal) => {
    const queryClient = useQueryClient();
    const mutaion = useMutation({
      mutationFn: (payload) => {
        return createOrder(payload);
      },
      onError: (err) => {
        toast.error("Error while adding items");
        // console.log(err);
      },
      onSuccess: (suc) => {
        toast.success("Item Added Sucessfully!");
        queryClient.invalidateQueries("books");
        // openAddModal()
      },
    });
    return mutaion;
  };

  export const useUpdateOrderQuery = () => {
    const queryClient = useQueryClient();
    const mutaion = useMutation({
      mutationFn: (id,payload) => {
        return editOrder(id, payload);
      },
      onError: (err) => {
        toast.error("Error while updating Sales");
      },
      onSuccess: (suc) => {
        toast.success("Sales Updated Sucessfully!");
        queryClient.invalidateQueries("books");
      },
    });
    return mutaion;
  };
  