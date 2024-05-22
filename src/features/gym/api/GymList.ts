import { axiosInstance } from "@/lib/axios";
import { PaginationQuery } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { GymListResponseDTO } from "./types";

type ApiParams = {
  // TODO: define params required to call the api
  // id: string;
  pagination: PaginationQuery;
};

const callApi = async (params: ApiParams): Promise<GymListResponseDTO> => {
  const apiEndpoint = `/v1/gyms?pageIndex=${params.pagination.page}&pageSize=${params.pagination.pageSize}`;
  return axiosInstance.get(apiEndpoint);
};

export const queryKeyGymList = "GymList-QueryKey";
export const useGymList = (params: ApiParams) => {
  return useQuery({
    queryKey: [
      queryKeyGymList,
      params.pagination.page,
      params.pagination.pageSize,
    ],
    queryFn: () => callApi(params),

    // Uncomment following when you need to keep current data displayed on page
    // until next data is available from api
    // placeholderData: keepPreviousData,
  });
};
