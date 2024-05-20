import { Button } from "@/components/Elements";
import { GenderEnum } from "@/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { MemberListItem } from "../../api/types";
import { WizardStepOneForm } from "./WizardStepOneForm";
import { WizardStepTwoForm } from "./WizardStepTwoForm";
import { FormValues, schema } from "./schema";

const useFormWithValidation = (data: MemberListItem) => {
  const form = useForm<FormValues>({
    defaultValues: {
      stepOne: {
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        countryShortCode: data.countryShortCode,
        countryCode: data.countryCode,
        email: data.email,
        dob: data.dob,
        gender: data.gender as GenderEnum,
        dateOfJoing: data.dateOfJoing,
        address: data.address,
        notes: data.notes,
      },
      // stepTwo: {
      //   planId: data.planId,
      //   batchId: data.batchId,
      //   startDate: data.startDate,
      //   trainingType: data.trainingType,
      //   admissionFees: data.admissionFees,
      //   discount: data.discount,
      //   discountType: data.discountType,
      //   payments: data.payments,
      // },
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

export const SteppedForm = (
  data: MemberListItem,
  onSubmit: SubmitHandler<FormValues>,
  isApiRequestPending: boolean,
  totalSteps: number
) => {
  const methods = useFormWithValidation(data);

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
