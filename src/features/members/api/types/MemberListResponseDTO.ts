import { APIResponse } from "@/types/api";
export type MemberListResponseDTO = APIResponse<Data>;

export type Data = {
  records: MemberListItem[];
  totalRecords: number;
};

export type MemberListItem = {
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
  plans: Plan[];
};

export type Plan = {
  planId: string;
  batchId: string;
  startDate: Date;
  trainingType: string;
  admissionFees: number;
  discount: number;
  discountType: string;
  payments: Payment[];
};

export type Payment = {
  amountPaid: number;
};
