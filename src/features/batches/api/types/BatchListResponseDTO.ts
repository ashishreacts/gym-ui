import { APIResponse } from "@/types/api";
export type BatchListResponseDTO = APIResponse<Data>;

export type Data = {
  records: BatchListItem[];
  totalRecords: number;
};

export type BatchListItem = {
  id: string;
  name: string;
  batchLimit: number;
  gymId: string;
  startTimeId: number;
  endTimeId: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
  startTime: Time;
  endTime: Time;
};

export type Time = {
  id: number;
  hour: number;
  minute: number;
};
