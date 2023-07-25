import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { customerDetail, getCustomer } from "../services/customer";

export const useGetCustomerQuery = (pageno) => {
  return useQuery("customer", () => getCustomer(pageno), {
    onError: (err) => {
      toast.error("Error Getting Sales!");
    },
  });
};
export const useGetCustomerDetailQuery = (id) => {
    return useQuery("customerDetail", () => customerDetail(id), {
      onError: (err) => {
        toast.error("Error Getting customer!");
      },
    });
  };