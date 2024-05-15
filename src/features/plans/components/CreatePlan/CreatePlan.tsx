import { Button } from "@/components/Elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import * as yup from "yup";
import { useCreatePlan } from "../../api";

// TODO: add type for form
export type FormValues = {
  name: string;
  price: number;
  durationInMoths: number;
};

// TODO: write schema (validations) for FormType
const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  durationInMoths: yup.number().required(),
});

// TODO: define default values
const useFormWithValidation = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      price: 0,
      durationInMoths: 0,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

const CreatePlanForm = (
  onSubmit: SubmitHandler<FormValues>,
  isApiRequestPending: boolean
) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    control: _hookFormControl,
  } = useFormWithValidation();
  const { errors, isDirty, isValid, isSubmitSuccessful } = formState;
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
      fullWidth
      disabled={!isDirty || !isValid || isApiRequestPending}
      form={formId}
      isLoading={isApiRequestPending}
    >
      Submit
    </Button>
  );

  const Form = () => (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {/* TODO: ADD FORM ELEMENTS HERE.......................... */}

        <TextField
          label="Enter Plan Name"
          variant="outlined"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message ?? ""}
        />

        <TextField
          label="Enter Price"
          type="number"
          fullWidth
          inputProps={{
            min: 0,
          }}
          variant="outlined"
          {...register("price", {
            valueAsNumber: true,
          })}
          error={!!errors.price}
          helperText={errors.price?.message ?? ""}
        />

        <TextField
          label="Duration in Months"
          type="number"
          fullWidth
          inputProps={{
            min: 0,
          }}
          variant="outlined"
          {...register("durationInMoths", {
            valueAsNumber: true,
          })}
          error={!!errors.durationInMoths}
          helperText={errors.durationInMoths?.message ?? ""}
        />

        <SubmitButton />
      </Box>
    </form>
  );

  return { SubmitButton, Form };
};

type Props = {
  onSuccess: () => void;
};

// Keep the code in this component short
// - it should serve as top level for smaller components
export const CreatePlan: React.FC<Props> = ({ onSuccess }) => {
  const api = useCreatePlan();
  const isApiRequestPending = api.isPending;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // TODO: HANLDE FORM SUBMISSION HERE....................

    await api.mutateAsync({
      data,
      gymId: "5a0b9b6c-358f-406a-a82e-70cf9ba5ba70",
    });
    onSuccess();
  };

  const { Form } = CreatePlanForm(onSubmit, isApiRequestPending);

  return (
    <>
      <Form />
    </>
  );
};
