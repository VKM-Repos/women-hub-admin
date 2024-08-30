import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { authApi, publicApi } from "@/config/axiosInstance";

// interface queryOptions {
//   url: string;
//   withAuth: boolean;
// }
export const usePOST = (
  url: string,
  withAuth = true,
  contentType = "application/json",
  callback: (data: any) => void
) => {
  const { mutate, isError, isPending, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = withAuth ? authApi : publicApi;
      const response = await axiosInstance.post(url, values, {
        headers: {
          "Content-Type": contentType,
        },
      });
      return response?.data;
    },
    onSuccess: (returnedData) => {
      callback && callback(returnedData);
      // toast.success("Success");
    },
    onError: (error: { response: { data: any } }) => {
      console.log(error.response.data, ">>>>>>>>>>>>>>>>");

      return toast.error(error.response.data.detail || "Something went wrong");
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
