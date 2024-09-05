import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createApiInstance } from "@/config/axiosInstance";
export interface PatchOptions {
  baseURL?: string;
  withAuth?: boolean;
  method?: string;
  contentType?: string;
  callback?: (data: any) => void;
}
export const usePATCH = (
  url: string,
  {
    baseURL,
    // withAuth = true, // Default to true, but can be overridden
    method = "PUT",
    contentType = "application/json",
    callback,
  }: PatchOptions = {}
) => {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = createApiInstance(
        baseURL || "https://dev.womenhub.org/api/"
      );
      const response =
        method == "PUT"
          ? await axiosInstance.put(url, values, {
              headers: {
                "Content-Type": contentType,
              },
            })
          : await axiosInstance.patch(url, values, {
              headers: {
                "Content-Type": contentType,
              },
            });
      return response?.data;
    },
    onSuccess: (returnedData) => {
      console.log(returnedData);
      toast.success("Success");

      callback && callback(returnedData);
    },
    onError: (err) => {
      // (err?.data?.message instanceof Array) ? toast.error(err?.data?.message[0]) : toast.error(err?.data?.message)
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
