import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { CreateGymResponseDTO } from "./types";
import { queryKeyGymList } from "./GymList";

type CreateGymRequestDTO = {
  // TODO: define type
  // NOTE: if FormValues type is same as this then dont add anything here
};

type ApiParams = {
  data: CreateGymRequestDTO;
};

const callApi = async (params: ApiParams): Promise<CreateGymResponseDTO> => {
  const apiEndpoint = `/v1/gyms`;
  return axiosInstance.post(apiEndpoint, params.data);
};

export const useCreateGym = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (params: ApiParams) => {
      return callApi(params);
    },
    onMutate: async (_apiParams: ApiParams) => {
      // TODO: use correct queryKeys here, use keys from _apiParams if required
      // cancel ongoing queries, need awaiting before calling actual api
      await queryClient.cancelQueries({ queryKey: [queryKeyGymList] });
    },
    onSuccess: (_responseData: CreateGymResponseDTO, _apiParams: ApiParams) => {
      // TODO: use correct queryKeys here, use values from _apiParams/_responseData if required
      queryClient.invalidateQueries({ queryKey: [queryKeyGymList] });

      addNotification({
        type: "success",
        title: "Request Successful",
        message: _responseData.message,
      });
    },
  });
};
