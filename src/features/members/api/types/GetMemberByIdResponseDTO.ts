import { GenderEnum } from "@/features/auth";
import { APIResponse } from "@/types/api";
export type GetMemberByIdResponseDTO = APIResponse<GetMemberByIdData>;

export type GetMemberByIdData = {
  id: string;
  membershipId: number;
  firstName: string;
  lastName: string;
  mobile: string;
  countryShortCode: string;
  countryCode: string;
  email: string;
  dob: Date;
  gender: GenderEnum;
  dateOfJoing: Date;
  address: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
  gymId: string;
  plans: Plan[];
};

export type Plan = {
  id: string;
  memberId: string;
  planId: string;
  batchId: string;
  startDate: Date;
  trainingType: string;
  admissionFees: number;
  discount: number;
  discountType: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
  payments: Payment[];
};

export type Payment = {
  id: string;
  amountPaid: number;
  memberPlanId: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: null;
};
