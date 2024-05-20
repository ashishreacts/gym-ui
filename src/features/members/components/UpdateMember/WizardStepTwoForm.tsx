import { AppDatePicker, WizardStepProps } from "@/components/Elements";
import { Box, Button, TextField } from "@mui/material";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { BatchIdDropdown } from "./BatchIdDropdown";
import { PlanIdDropdown } from "./PlanIdDropdown";
import { FormValues } from "./schema";
import { TrainingTypeDropdown } from "./TrainingTypeDropdown";
import { DiscountTypeDropdown } from "./DiscountTypeDropdown";

export const WizardStepTwoForm = forwardRef(
  ({ onSuccessValidation, onBack }: WizardStepProps, _ref) => {
    const {
      control: _hookFormControl,
      formState,
      trigger,
      register,
      getValues,
    } = useFormContext<FormValues>();
    const { errors } = formState;

    const onNext = async () => {
      // Triggers only the validation schema for this wizard-step/section
      // TODO: Use correct form section name
      const isValid = await trigger("stepOne");
      if (isValid) {
        onSuccessValidation();
      }
    };

    return (
      <Box>
        {/* TODO: Define the form of this wizard-step/section */}
        <PlanIdDropdown register={register} errors={errors} />

        <BatchIdDropdown register={register} errors={errors} />

        <AppDatePicker
          control={_hookFormControl}
          name={"stepTwo.startDate"}
          datePickerProps={{
            label: "Start Date",
            value: getValues("stepTwo.startDate") || null,
          }}
          errorHandlingProps={{
            formError: errors.stepTwo?.startDate,
          }}
        />

        <TrainingTypeDropdown register={register} errors={errors} />

        <TextField
          label="Admission Fees"
          type="number"
          fullWidth
          inputProps={{
            min: 0,
          }}
          variant="outlined"
          {...register("stepTwo.admissionFees", {
            valueAsNumber: true,
          })}
          error={!!errors.stepTwo?.admissionFees}
          helperText={errors.stepTwo?.admissionFees?.message ?? ""}
        />

        <TextField
          label="Discount"
          type="number"
          fullWidth
          inputProps={{
            min: 0,
          }}
          variant="outlined"
          {...register("stepTwo.discount", {
            valueAsNumber: true,
          })}
          error={!!errors.stepTwo?.discount}
          helperText={errors.stepTwo?.discount?.message ?? ""}
        />

        <DiscountTypeDropdown register={register} errors={errors} />

        <TextField
          label="Add Payment"
          type="number"
          fullWidth
          inputProps={{
            min: 0,
          }}
          variant="outlined"
          {...register("stepTwo.payments", {
            valueAsNumber: true,
          })}
          error={!!errors.stepTwo?.payments}
          helperText={errors.stepTwo?.payments?.message ?? ""}
        />

        {/* TODO: keep either of "Next" or "Back" button */}
        <Button onClick={onNext}>Next</Button>
        <Button onClick={onBack}>Back</Button>
      </Box>
    );
  }
);
