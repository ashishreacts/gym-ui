import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { UpdatePlanResponseDTO } from "./types";
import { queryKeyPlan } from "../api/PlanList";

type UpdatePlanRequestDTO = {
  // TODO: define type
  // NOTE: if FormValues type is same as this then dont add anything here
};

type ApiParams = {
  data: UpdatePlanRequestDTO;
  gymId: string;
  id: string;
};

const callApi = async (params: ApiParams): Promise<UpdatePlanResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/plans/${params.id}`; // TODO: set valid api endpoint
  return axiosInstance.put(apiEndpoint, params.data);
};

export const useUpdatePlan = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (params: ApiParams) => {
      return callApi(params);
    },
    onMutate: async (_apiParams: ApiParams) => {
      // TODO: use correct queryKeys here, use keys from _apiParams if required
      // cancel ongoing queries, need awaiting before calling actual api
      await queryClient.cancelQueries({ queryKey: [queryKeyPlan] });
    },
    onSuccess: (
      _responseData: UpdatePlanResponseDTO,
      _apiParams: ApiParams
    ) => {
      // TODO: use correct queryKeys here, use values from _apiParams/_responseData if required
      queryClient.invalidateQueries({ queryKey: [queryKeyPlan] });

      addNotification({
        type: "success",
        title: "Request Successful",
        message: _responseData.message,
      });
    },
  });
};
