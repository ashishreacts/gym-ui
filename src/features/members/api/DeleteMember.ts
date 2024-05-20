import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { queryKeyMemberList } from "../api/MemberList";
import { DeleteMemberResponseDTO } from "./types";

type ApiParams = {
  gymId: string;
  id: string;
};

const callApi = async (params: ApiParams): Promise<DeleteMemberResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/members/${params.id}`;
  return axiosInstance.delete(apiEndpoint);
};

export const useDeleteMember = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (params: ApiParams) => {
      return callApi(params);
    },
    onMutate: async (_apiParams: ApiParams) => {
      // TODO: use correct queryKeys here, use keys from _apiParams if required
      // cancel ongoing queries, need awaiting before calling actual api
      await queryClient.cancelQueries({ queryKey: [queryKeyMemberList] });
    },
    onSuccess: (
      _responseData: DeleteMemberResponseDTO,
      _apiParams: ApiParams
    ) => {
      // TODO: use correct queryKeys here, use values from _apiParams/_responseData if required
      queryClient.invalidateQueries({ queryKey: [queryKeyMemberList] });

      addNotification({
        type: "success",
        title: "Request Successful",
        message: _responseData.message,
      });
    },
  });
};
