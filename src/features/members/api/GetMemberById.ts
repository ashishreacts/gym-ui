import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetMemberByIdResponseDTO } from "./types";

type ApiParams = {
  gymId: string;
  memberId: string;
};

const callApi = async (
  params: ApiParams
): Promise<GetMemberByIdResponseDTO> => {
  // if (!params.memberId) {
  //   // throw Error("memberId is undefined");
  // }

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
