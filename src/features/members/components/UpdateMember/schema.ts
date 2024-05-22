import { GenderEnum } from "@/features/auth";
import * as yup from "yup";

type StepOneFormValues = {
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
};

type StepTwoFormValues = {
  planId: string; //uuid yup.string.uuid
  batchId: string;
  startDate: Date;
  trainingType: string;
  admissionFees: number;
  discount: number;
  discountType: string;
  payments: number;
};

const stepOneSchema: yup.ObjectSchema<StepOneFormValues> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  mobile: yup.string().required(),
  countryShortCode: yup.string().required(),
  countryCode: yup.string().required(),
  email: yup.string().email().required(),
  dob: yup.date().required(),
  gender: yup.mixed<GenderEnum>().oneOf(Object.values(GenderEnum)).required(),
  dateOfJoing: yup.date().required(),
  address: yup.string().required(),
  notes: yup.string().required(),
});

const stepTwoSchema: yup.ObjectSchema<StepTwoFormValues> = yup.object().shape({
  planId: yup.string().uuid().required(),
  batchId: yup.string().uuid().required(),
  startDate: yup.date().required(),
  trainingType: yup.string().required(),
  admissionFees: yup.number().required(),
  discount: yup.number().required(),
  discountType: yup.string().required(),
  payments: yup.number().required(),
});

// TODO: use valid name for key & type of FormValues
export type FormValues = {
  stepOne: StepOneFormValues;
  stepTwo: StepTwoFormValues;
};

export const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
});
