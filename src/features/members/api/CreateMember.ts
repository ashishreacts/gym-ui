import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery";
import { useNotificationStore } from "@/stores/notifications";
import { useMutation } from "@tanstack/react-query";
import { queryKeyMemberList } from "../api/MemberList";
import { CreateMemberResponseDTO } from "./types";

export type CreateMemberRequestDTO = {
  firstName: string;
  lastName: string;
  mobile: string;
  countryShortCode: string;
  countryCode: string;
  email: string;
  dob: string;
  gender: string;
  dateOfJoing: string;
  address: string;
  notes: string;
  plans: Plan[];
};

export type Plan = {
  planId: string;
  batchId: string;
  startDate: string;
  trainingType: string;
  admissionFees: number;
  discount: number;
  discountType: string;
  payments: Payment[];
};

export type Payment = {
  amountPaid: number;
};

type ApiParams = {
  data: CreateMemberRequestDTO;
  gymId: string;
};

const callApi = async (params: ApiParams): Promise<CreateMemberResponseDTO> => {
  const apiEndpoint = `/v1/gyms/${params.gymId}/members`;
  return axiosInstance.post(apiEndpoint, params.data);
};

export const useCreateMember = () => {
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
      _responseData: CreateMemberResponseDTO,
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
