import { axiosInstance } from "@/lib/axios";
import { PaginationQuery } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { BatchListResponseDTO } from "./types";

type ApiParams = {
  // TODO: define params required to call the api
  // id: string;
  pagination: PaginationQuery;
  gymId: string;
};

const callApi = async (params: ApiParams): Promise<BatchListResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/batches?pageIndex=${params.pagination.page}&pageSize=${params.pagination.pageSize}`; // TODO: set valid api endpoint"
  return axiosInstance.get(apiEndpoint);
};

export const queryKeyBatchList = "BatchList-QueryKey";
export const useBatchList = (params: ApiParams) => {
  return useQuery({
    queryKey: [
      queryKeyBatchList,
      params.pagination.page,
      params.pagination.pageSize,
    ],
    queryFn: () => callApi(params),

    // Uncomment following when you need to keep current data displayed on page
    // until next data is available from api
    // placeholderData: keepPreviousData,
  });
};
