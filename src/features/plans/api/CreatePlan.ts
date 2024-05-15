import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { queryKeyPlan } from "../api/PlanList";
import { CreatePlanResponseDTO } from "./types";

type CreatePlanRequestDTO = {
  // TODO: define type
  // NOTE: if FormValues type is same as this then dont add anything here
};

type ApiParams = {
  data: CreatePlanRequestDTO;
  gymId: string;
};

const callApi = async (params: ApiParams): Promise<CreatePlanResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/plans`;
  return axiosInstance.post(apiEndpoint, params.data);
};

export const useCreatePlan = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (params: ApiParams) => {
      return callApi(params);
    },
    onMutate: async (_apiParams: ApiParams) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeyPlan],
      });
    },
    onSuccess: (
      _responseData: CreatePlanResponseDTO,
      _apiParams: ApiParams
    ) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeyPlan],
      });

      addNotification({
        type: "success",
        title: "Request Successful",
        message: _responseData.message,
      });
    },
  });
};
