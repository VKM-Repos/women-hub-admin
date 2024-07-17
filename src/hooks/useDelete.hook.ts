import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { authApi, publicApi } from "@/config/axiosInstance";

export const useDELETE = (
  url: string,
  withAuth = true,
  callback: (data: any) => void
) => {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = withAuth ? authApi : publicApi;
      const response = await axiosInstance.delete(url, { data: values });
      return response;
    },
    onSuccess: (returnedData) => {
      toast.success(returnedData?.data?.message || "Deleted successfully");
      callback && callback(returnedData);
    },
    onError: (err) => {
      // toast.error(err?.data?.message);
      console.log(err);
    },
  });

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
    data,
    error,
  };
};
