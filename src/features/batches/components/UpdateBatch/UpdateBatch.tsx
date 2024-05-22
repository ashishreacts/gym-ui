import { Button } from "@/components/Elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit } from "@mui/icons-material";
import { Box, ListItemIcon, MenuItem, Modal, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import * as yup from "yup";
import { UpdateBatchRequestDTO, useUpdateBatch } from "../../api";
import { BatchListItem } from "../../api/types";

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
const useFormWithValidation = ({
  name,
  startTime,
  endTime,
  batchLimit,
}: BatchListItem) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name,
      startTime: `${startTime.hour}:${startTime.minute}`,
      endTime: `${endTime.hour}:${endTime.minute}`,
      batchLimit,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

const UpdateBatchForm = (
  data: BatchListItem,
  onSubmit: SubmitHandler<FormValues>,
  isApiRequestPending: boolean
) => {
  const form = useFormWithValidation(data);
  const { register, handleSubmit, formState, reset } = form;
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
          label="Start Time"
          variant="outlined"
          fullWidth
          type="time"
          {...register("startTime")}
          error={!!errors.startTime}
          helperText={errors.startTime?.message ?? ""}
        />

        <TextField
          label="End Time"
          variant="outlined"
          fullWidth
          type="time"
          {...register("endTime")}
          error={!!errors.endTime}
          helperText={errors.endTime?.message ?? ""}
        />

        <TextField
          label="Batch Limit"
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
  data: BatchListItem;
};

// Keep the code in this component short
// - it should serve as top level for smaller components
export const UpdateBatch: React.FC<Props> = ({
  onSuccess,
  data: BatchItemData,
}) => {
  const api = useUpdateBatch();
  const isApiRequestPending = api.isPending;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // TODO: HANLDE FORM SUBMISSION HERE....................
    const startTimeData = data.startTime.split(":");
    const startTimeHour = parseInt(startTimeData[0]);
    const startTimeMin = parseInt(startTimeData[0]);

    const endTimeData = data.startTime.split(":");
    const endTimeHour = parseInt(endTimeData[0]);
    const endTimeMin = parseInt(endTimeData[0]);

    const requestData: UpdateBatchRequestDTO = {
      name: data.name,
      startTime: {
        hour: startTimeHour,
        minute: startTimeMin,
      },
      endTime: {
        hour: endTimeHour,
        minute: endTimeMin,
      },
      batchLimit: data.batchLimit,
    };

    await api.mutateAsync({
      data: requestData,
      gymId: BatchItemData.gymId,
      id: BatchItemData.id,
    });
    onSuccess();
  };

  const { Form } = UpdateBatchForm(
    BatchItemData,
    onSubmit,
    isApiRequestPending
  );

  return (
    <>
      <MenuItem
        onClick={() => {
          handleOpen();
        }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit
      </MenuItem>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form />
        </Box>
      </Modal>
    </>
  );
};
