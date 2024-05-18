import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { queryKeyBatchList } from "./BatchList";
import { UpdateBatchResponseDTO } from "./types";

export type UpdateBatchRequestDTO = {
  name: string;
  startTime: Time;
  endTime: Time;
  batchLimit: number;
};

export type Time = {
  hour: number;
  minute: number;
};

type ApiParams = {
  data: UpdateBatchRequestDTO;
  gymId: string;
  id: string;
};

const callApi = async (params: ApiParams): Promise<UpdateBatchResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/batches/${params.id}`;
  return axiosInstance.put(apiEndpoint, params.data);
};

export const useUpdateBatch = () => {
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
      _responseData: UpdateBatchResponseDTO,
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
