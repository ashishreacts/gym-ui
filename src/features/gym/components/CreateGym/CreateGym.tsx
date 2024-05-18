import { Button } from "@/components/Elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import * as yup from "yup";
import { useCreateGym } from "../../api";

// TODO: add type for form
export type FormValues = {
  name: string;
};

// TODO: write schema (validations) for FormType
const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  name: yup.string().required(),
});

// TODO: define default values
const useFormWithValidation = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

const CreateGymForm = (
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
          label="Enter Gym Name"
          variant="outlined"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message ?? ""}
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
export const CreateGym: React.FC<Props> = ({ onSuccess }) => {
  const api = useCreateGym();
  const isApiRequestPending = api.isPending;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // TODO: HANLDE FORM SUBMISSION HERE....................
    await api.mutateAsync({ data });
    onSuccess();
  };

  const { Form } = CreateGymForm(onSubmit, isApiRequestPending);

  return (
    <>
      <Form />
    </>
  );
};
