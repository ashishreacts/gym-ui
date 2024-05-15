import { APIResponse } from "@/types/api";
export type CreateBatchResponseDTO = APIResponse<CreateBatchResponse>;

type CreateBatchResponse = {
  id: string;
  name: string;
  batchLimit: number;
  gymId: string;
  startTimeId: number;
  endTimeId: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
};
