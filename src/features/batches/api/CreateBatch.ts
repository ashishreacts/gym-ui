import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { CreateBatchResponseDTO } from "./types";
import { queryKeyBatchList } from "./BatchList";

export type CreateBatchRequestDTO = {
  name: string;
  startTime: Time;
  endTime: Time;
  batchLimit: number;
};

type Time = {
  hour: number;
  minute: number;
};

type ApiParams = {
  data: CreateBatchRequestDTO;
  gymId: string;
};

const callApi = async (params: ApiParams): Promise<CreateBatchResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/batches`; // TODO: set valid api endpoint
  return axiosInstance.post(apiEndpoint, params.data);
};

export const useCreateBatch = () => {
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
      _responseData: CreateBatchResponseDTO,
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
