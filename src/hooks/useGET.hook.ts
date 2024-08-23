import { useQuery } from "@tanstack/react-query";
import { authApi, publicApi } from "@/config/axiosInstance";

export const useGET = ({
  url,
  queryKey,
  withAuth = false,
  enabled,
}: {
  url: string;
  queryKey: any[];
  withAuth: boolean;
  enabled: boolean;
}) => {
  const fetch = async () => {
    const axiosInstance = withAuth ? authApi : publicApi;
    const response = await axiosInstance.get(url);
    return response?.data;
  };

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isLoadingError,
    isRefetchError,
  } = useQuery({ queryKey: queryKey, queryFn: fetch, enabled: enabled });
  return {
    data,
    isFetching,
    isLoading,
    isPending,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isLoadingError,
    isRefetchError,
  };
};
