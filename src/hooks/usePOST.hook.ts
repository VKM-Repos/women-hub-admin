import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createApiInstance } from "@/config/axiosInstance";

interface PostOptions {
  baseURL?: string;
  withAuth?: boolean;
  contentType?: string;
  callback?: (data: any) => void;
}
export const usePOST = (
  endPoint: string,
  {
    baseURL,
    // withAuth = true, // Default to true, but can be overridden
    contentType = "application/json",
    callback,
  }: PostOptions = {}
) => {
  const { mutate, isError, isPending, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = createApiInstance(
        baseURL || "https://dev.womenhub.org/api/"
      );

      const response = await axiosInstance.post(endPoint, values, {
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
