import { axiosInstance } from "@/lib/axios";
import { PaginationQuery } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { MemberListResponseDTO } from "./types";

type ApiParams = {
  // TODO: define params required to call the api
  // id: string;
  pagination: PaginationQuery;
  gymId: string;
};

const callApi = async (params: ApiParams): Promise<MemberListResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/members?pageIndex=${params.pagination.page}&pageSize=${params.pagination.pageSize}`;
  return axiosInstance.get(apiEndpoint);
};

export const queryKeyMemberList = "MemberList-QueryKey";
export const useMemberList = (params: ApiParams) => {
  return useQuery({
    queryKey: [
      queryKeyMemberList,
      params.pagination.page,
      params.pagination.pageSize,
    ],
    queryFn: () => callApi(params),

    // Uncomment following when you need to keep current data displayed on page
    // until next data is available from api
    // placeholderData: keepPreviousData,
  });
};
