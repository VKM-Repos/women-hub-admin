/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { createApiInstance } from "@/config/axiosInstance";
import { PatchOptions } from "./usePATCH.hook";

export const useRealPATCH = (
  url: string,
  { baseURL, contentType = "application/json", callback }: PatchOptions = {}
) => {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = createApiInstance(
        baseURL || import.meta.env.VITE_APP_BASE_URL
      );
      const response = await axiosInstance.patch(url, values, {
        headers: {
          "Content-Type": contentType,
        },
      });
      return response?.data;
    },
    onSuccess: (returnedData) => {
      console.log(returnedData);
      callback && callback(returnedData);
    },
    onError: (err) => {
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
