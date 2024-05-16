import { Button } from "@/components/Elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit } from "@mui/icons-material";
import { Box, ListItemIcon, MenuItem, Modal, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import * as yup from "yup";
import { useUpdatePlan } from "../../api";
import { PlanListItem } from "../../api/types";

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
const useFormWithValidation = ({
  name,
  price,
  durationInMoths,
}: PlanListItem) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name,
      price,
      durationInMoths,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

const UpdatePlanForm = (
  data: PlanListItem,
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
          label="Plan Name"
          variant="outlined"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message ?? ""}
        />

        <TextField
          label="Price"
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
          label="Duration of Months"
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
  data: PlanListItem;
};

// Keep the code in this component short
// - it should serve as top level for smaller components
export const UpdatePlan: React.FC<Props> = ({
  onSuccess,
  data: PlanItemData,
}) => {
  const api = useUpdatePlan();
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
    await api.mutateAsync({
      data,
      gymId: PlanItemData.gymId,
      id: PlanItemData.id,
    });
    onSuccess();
  };

  const { Form } = UpdatePlanForm(PlanItemData, onSubmit, isApiRequestPending);

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
