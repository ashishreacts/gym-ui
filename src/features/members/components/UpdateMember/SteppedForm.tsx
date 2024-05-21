import { Button } from "@/components/Elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import {
  ApiParams,
  callApi as GetMemberByIdApi,
} from "../../api/getMemberByIds";
import { WizardStepOneForm } from "./WizardStepOneForm";
import { WizardStepTwoForm } from "./WizardStepTwoForm";
import { FormValues, schema } from "./schema";

const useFormWithValidation = (params: ApiParams) => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      return await getDefaultValuesFromApi(params);
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

export const SteppedForm = (
  onSubmit: SubmitHandler<FormValues>,
  isApiRequestPending: boolean,
  totalSteps: number,
  params: ApiParams
) => {
  const methods = useFormWithValidation(params);

  const {
    register,
    handleSubmit,
    formState,
    reset,
    control: _hookFormControl,
  } = methods;

  const { isDirty, isValid, isSubmitSuccessful } = formState;
  const formId = v4();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const SubmitButton = () => (
    <Button
      type="submit"
      variant="contained"
      disabled={!isDirty || !isValid || isApiRequestPending}
      form={formId}
      isLoading={isApiRequestPending}
    >
      Submit
    </Button>
  );

  const [activeStep, setActiveStep] = useState(1);

  const onBack = () => {
    if (activeStep !== 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const onSuccessValidation = () => {
    setActiveStep(activeStep + 1);
  };

  const Form = () => (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: ADD STEPS HERE.......................... */}
        {activeStep === 1 && (
          <WizardStepOneForm
            {...register("stepOne")}
            onSuccessValidation={onSuccessValidation}
            onBack={onBack}
            totalSteps={totalSteps}
          />
        )}
        {activeStep === 2 && (
          <WizardStepTwoForm
            {...register("stepTwo")}
            onSuccessValidation={onSuccessValidation}
            onBack={onBack}
            totalSteps={totalSteps}
          />
        )}
      </form>
    </FormProvider>
  );

  return { SubmitButton, Form, activeStep };
};
async function getDefaultValuesFromApi({ gymId, memberId }: ApiParams) {
  const apidata = await GetMemberByIdApi({
    gymId,
    memberId,
  });

  const data = apidata.data;

  const defaults: FormValues = {
    stepOne: {
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      countryShortCode: data.countryShortCode,
      countryCode: data.countryCode,
      email: data.email,
      dob: new Date(data.dob),
      gender: data.gender,
      dateOfJoing: new Date(data.dateOfJoing),
      address: data.address,
      notes: data.notes,
    },
    stepTwo: {
      planId: data.plans[0].planId,
      batchId: data.plans[0].batchId,
      startDate: new Date(data.plans[0].startDate),
      trainingType: data.plans[0].trainingType,
      admissionFees: data.plans[0].admissionFees,
      discount: data.plans[0].discount,
      discountType: data.plans[0].discountType,
      payments: data.plans[0].payments[0].amountPaid,
    },
  };

  return defaults;
}
