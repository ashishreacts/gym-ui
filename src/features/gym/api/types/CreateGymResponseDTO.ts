import { APIResponse } from "@/types/api";
export type CreateGymResponseDTO = APIResponse<GymResponse>;

export type GymResponse = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
};
