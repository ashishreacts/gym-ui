import { Button } from "@/components/Elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { WizardStepOneForm } from "./WizardStepOneForm";
import { WizardStepTwoForm } from "./WizardStepTwoForm";
import { FormValues, schema } from "./schema";

const useFormWithValidation = () => {
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

export const SteppedForm = (
  onSubmit: SubmitHandler<FormValues>,
  isApiRequestPending: boolean,
  totalSteps: number
) => {
  const methods = useFormWithValidation();

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
        {activeStep === 1 && (
          <WizardStepOneForm
            {...register("personalInfo")}
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
