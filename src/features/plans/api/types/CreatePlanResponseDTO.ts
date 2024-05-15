import { APIResponse } from "@/types/api";
export type CreatePlanResponseDTO = APIResponse<PlanResponse>;

export type PlanResponse = {
  id: string;
  name: string;
  price: number;
  durationInMoths: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
  gymId: string;
};
