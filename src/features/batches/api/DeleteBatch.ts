import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { queryKeyBatchList } from "./BatchList";
import { DeleteBatchResponseDTO } from "./types";

// type DeleteBatchRequestDTO = {
//   // TODO: define type
//   // NOTE: if FormValues type is same as this then dont add anything here
// };

type ApiParams = {
  gymId: string;
  id: string;
};

const callApi = async (params: ApiParams): Promise<DeleteBatchResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/batches/${params.id}`;
  return axiosInstance.delete(apiEndpoint);
};

export const useDeleteBatch = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (params: ApiParams) => {
      return callApi(params);
    },
    onMutate: async (_apiParams: ApiParams) => {
      // TODO: use correct queryKeys here, use keys from _apiParams if required
      // cancel ongoing queries, need awaiting before calling actual api
      await queryClient.cancelQueries({ queryKey: [queryKeyBatchList] });
    },
    onSuccess: (
      _responseData: DeleteBatchResponseDTO,
      _apiParams: ApiParams
    ) => {
      // TODO: use correct queryKeys here, use values from _apiParams/_responseData if required
      queryClient.invalidateQueries({ queryKey: [queryKeyBatchList] });

      addNotification({
        type: "success",
        title: "Request Successful",
        message: _responseData.message,
      });
    },
  });
};
