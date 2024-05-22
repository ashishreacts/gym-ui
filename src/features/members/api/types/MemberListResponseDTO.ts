import { APIResponse } from "@/types/api";
export type MemberListResponseDTO = APIResponse<Data>;

export type Data = {
  records: MemberListItem[];
  totalRecords: number;
};

export type MemberListItem = {
  id: string;
  membershipId: number;
  firstName: string;
  lastName: string;
  mobile: string;
  countryShortCode: string;
  countryCode: string;
  email: string;
  dob: Date;
  gender: string;
  dateOfJoing: Date;
  address: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
  gymId: string;
};
