import { Container, Step, StepLabel, Stepper } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { CreateMemberRequestDTO, useCreateMember } from "../../api";
import { SteppedForm } from "./SteppedForm";
import { FormValues } from "./schema";

type Props = {
  onSuccess: () => void;
};

// Component to be exported.
// Keep the code in this component short - it should serve as top level for smaller components
// export const Sample: React.FC<Props> = ({destructure props here}) => {...}
export const CreateMember: React.FC<Props> = (
  { onSuccess }
  // data: FormValues
) => {
  const api = useCreateMember();
  const isApiRequestPending = api.isPending;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const requestData: CreateMemberRequestDTO = {
      firstName: data.stepOne.firstName,
      lastName: data.stepOne.lastName,
      mobile: data.stepOne.mobile,
      countryShortCode: data.stepOne.countryShortCode,
      countryCode: data.stepOne.countryCode,
      email: data.stepOne.email,
      dob: new Date(data.stepOne.dob).toISOString().split("T")[0],
      gender: data.stepOne.gender,
      dateOfJoing: new Date(data.stepOne.dateOfJoing)
        .toISOString()
        .split("T")[0],
      address: data.stepOne.address,
      notes: data.stepOne.notes,
      plans: [
        {
          planId: data.stepTwo.planId,
          batchId: data.stepTwo.batchId,
          startDate: new Date(data.stepTwo.startDate)
            .toISOString()
            .split("T")[0],
          trainingType: data.stepTwo.trainingType,
          admissionFees: data.stepTwo.admissionFees,
          discount: data.stepTwo.discount,
          discountType: data.stepTwo.discountType,
          payments: [
            {
              amountPaid: data.stepTwo.payments,
            },
          ],
        },
      ],
    };
    await api.mutateAsync({
      // TODO: assign appropriate data here
      data: requestData,
      gymId: "5a0b9b6c-358f-406a-a82e-70cf9ba5ba70",
    });
    onSuccess();
  };

  // TODO: define step titles here
  const stepTitles = ["Step One", "Step Two"];

  const { Form, SubmitButton, activeStep } = SteppedForm(
    onSubmit,
    isApiRequestPending,
    stepTitles.length
  );

  return (
    <Container>
      <Stepper activeStep={activeStep - 1} alternativeLabel>
        {stepTitles.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Form />
      {activeStep === stepTitles.length ? <SubmitButton /> : <></>}
    </Container>
  );
};
