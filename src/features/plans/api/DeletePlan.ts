import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { queryKeyPlan } from "../api/PlanList";
import { DeletePlanResponseDTO } from "./types";

type ApiParams = {
  gymId: string;
  id: string;
};

const callApi = async (params: ApiParams): Promise<DeletePlanResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/plans/${params.id}`;
  return axiosInstance.delete(apiEndpoint);
};

export const useDeletePlan = () => {
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
      _responseData: DeletePlanResponseDTO,
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
