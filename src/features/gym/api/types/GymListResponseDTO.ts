import { APIResponse } from "@/types/api";
export type GymListResponseDTO = APIResponse<Data>;

export type Data = {
  records: GymListItem[];
  totalRecords: number;
};
export type GymListItem = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
};
