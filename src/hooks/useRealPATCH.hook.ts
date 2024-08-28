/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { authApi, publicApi } from '@/config/axiosInstance';

export const useRealPATCH = (
  url: string,
  withAuth = true,
  callback: (data: any) => void,
  contentType = 'application/json'
) => {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = withAuth ? authApi : publicApi;
      const response = await axiosInstance.patch(url, values, {
        headers: {
          'Content-Type': contentType,
        },
      });
      return response?.data;
    },
    onSuccess: returnedData => {
      console.log(returnedData);
      callback && callback(returnedData);
    },
    onError: err => {
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
