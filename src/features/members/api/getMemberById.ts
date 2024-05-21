import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetMemberByIdResponseDTO } from "./types";

export type ApiParams = {
  gymId: string;
  memberId: string;
};

export const callApi = async (
  params: ApiParams
): Promise<GetMemberByIdResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/members/${params.memberId}`;
  return axiosInstance.get(apiEndpoint);
};

export const queryKeyGetMemberById = "GetMemberById-QueryKey";
export const useGetMemberById = (params: ApiParams) => {
  return useQuery({
    queryKey: [
      queryKeyGetMemberById,
      //
    ],
    queryFn: () => callApi(params),
  });
};
