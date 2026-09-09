/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createApiInstance } from '@/config/axiosInstance';

interface DeleteOptions {
  withAuth?: boolean;
  callback?: (data: any) => void;
  onError?: (error: any) => void;
  baseURL?: string;
  /** Set false when the caller shows its own success toast. */
  showSuccessToast?: boolean;
}

/** Pulls a readable message out of whatever shape the API returned. */
export const extractApiError = (error: any, fallback: string) =>
  error?.response?.data?.detail ||
  error?.response?.data?.title ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;

export const useDELETE = (
  url: string,
  {
    callback,
    onError,
    showSuccessToast = true,
    baseURL = import.meta.env.VITE_APP_BASE_URL,
  }: DeleteOptions = {}
) => {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = createApiInstance(
        baseURL || import.meta.env.VITE_APP_BASE_URL
      );
      const response = await axiosInstance.delete(url, { data: values });
      return response;
    },
    onSuccess: returnedData => {
      if (showSuccessToast) {
        toast.success(returnedData?.data?.message || 'Deleted successfully');
      }
      callback && callback(returnedData);
    },
    onError: (err: any) => {
      // Previously this only console.logged, so a failed delete looked
      // identical to nothing happening at all.
      toast.error(extractApiError(err, 'Could not delete. Please try again.'));
      onError && onError(err);
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
