import { Button } from "@/components/Elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import * as yup from "yup";
import { CreateBatchRequestDTO, useCreateBatch } from "../../api";

// TODO: add type for form
export type FormValues = {
  name: string;
  startTime: string;
  endTime: string;
  batchLimit: number;
};

// TODO: write schema (validations) for FormType
const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  name: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  batchLimit: yup.number().required(),
});

// TODO: define default values
const useFormWithValidation = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      startTime: "",
      endTime: "",
      batchLimit: 0,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

const CreateBatchForm = (
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
          label="Batch Name"
          variant="outlined"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message ?? ""}
        />

        <TextField
          label="Batch Start Time"
          variant="outlined"
          fullWidth
          type="time"
          {...register("startTime")}
          error={!!errors.startTime}
          helperText={errors.startTime?.message ?? ""}
        />

        <TextField
          label="Batch End Time"
          variant="outlined"
          fullWidth
          type="time"
          {...register("endTime")}
          error={!!errors.endTime}
          helperText={errors.endTime?.message ?? ""}
        />

        <TextField
          label="Batch limit"
          type="number"
          fullWidth
          inputProps={{
            min: 0,
          }}
          variant="outlined"
          {...register("batchLimit", {
            valueAsNumber: true,
          })}
          error={!!errors.batchLimit}
          helperText={errors.batchLimit?.message ?? ""}
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
export const CreateBatch: React.FC<Props> = ({ onSuccess }) => {
  const api = useCreateBatch();
  const isApiRequestPending = api.isPending;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // TODO: HANLDE FORM SUBMISSION HERE....................
    const TimeData = data.startTime.split(":");
    const TimeHour = parseInt(TimeData[0]);
    const TimeMinute = parseInt(TimeData[1]);

    const requestData: CreateBatchRequestDTO = {
      name: data.name,
      startTime: {
        hour: TimeHour,
        minute: TimeMinute,
      },
      endTime: {
        hour: TimeHour,
        minute: TimeMinute,
      },
      batchLimit: data.batchLimit,
    };
    await api.mutateAsync({
      data: requestData,
      gymId: "5a0b9b6c-358f-406a-a82e-70cf9ba5ba70",
    });
    onSuccess();
  };

  const { Form } = CreateBatchForm(onSubmit, isApiRequestPending);

  return (
    <>
      <Form />
    </>
  );
};
