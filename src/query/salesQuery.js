import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSales, getSales, saleDetail } from "../services/sales";
import { toast } from "react-toastify";

export const useGetSalesQuery = (pageno) => {
  return useQuery("sales", () => getSales(pageno), {
    onError: (err) => {
      toast.error("Error Getting Sales!");
    },
  });
};
export const useGetSaleDetailQuery = (id) => {
    return useQuery("saleDetail", () => saleDetail(id), {
      onError: (err) => {
        toast.error("Error Getting sale!");
      },
    });
  };


  export const useDeleteSales = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id) => {
        return deleteSales(id);
      },
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries(["sales"]);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
    };
  