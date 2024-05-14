import { APIResponse } from "@/types/api";
export type PlanResponseDTO = APIResponse<Data>;

export type Data = {
  records: PlanListItem[];
  totalRecords: number;
};

export type PlanListItem = {
  id: string;
  name: string;
  price: number;
  durationInMoths: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
  gymId: string;
};
