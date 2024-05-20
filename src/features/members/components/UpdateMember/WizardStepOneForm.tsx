import { AppDatePicker, WizardStepProps } from "@/components/Elements";
import { DevTool } from "@hookform/devtools";
import { Box, Button, TextField } from "@mui/material";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { GenderDropdown } from "./GenderDropdown";
import { FormValues } from "./schema";

export const WizardStepOneForm = forwardRef(
  ({ onSuccessValidation }: WizardStepProps, _ref) => {
    const {
      control: _hookFormControl,
      formState,
      trigger,
      register,
      // getValues,
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
        <TextField
          label="Enter First Name"
          variant="outlined"
          fullWidth
          {...register("stepOne.firstName")}
          error={!!errors.stepOne?.firstName}
          helperText={errors.stepOne?.firstName?.message ?? ""}
        />
        <TextField
          label="Enter Last Name"
          variant="outlined"
          fullWidth
          {...register("stepOne.lastName")}
          error={!!errors.stepOne?.lastName}
          helperText={errors.stepOne?.lastName?.message ?? ""}
        />
        <TextField
          label="Enter Mobile Number"
          variant="outlined"
          fullWidth
          {...register("stepOne.mobile")}
          error={!!errors.stepOne?.mobile}
          helperText={errors.stepOne?.mobile?.message ?? ""}
        />
        <TextField
          label="Entry Country Short Code"
          variant="outlined"
          fullWidth
          {...register("stepOne.countryShortCode")}
          error={!!errors.stepOne?.countryShortCode}
          helperText={errors.stepOne?.countryShortCode?.message ?? ""}
        />
        <TextField
          label="Entry Country Code"
          variant="outlined"
          fullWidth
          {...register("stepOne.countryCode")}
          error={!!errors.stepOne?.countryCode}
          helperText={errors.stepOne?.countryCode?.message ?? ""}
        />
        <TextField
          label="Enter Email"
          variant="outlined"
          fullWidth
          {...register("stepOne.email")}
          error={!!errors.stepOne?.email}
          helperText={errors.stepOne?.email?.message ?? ""}
        />
        <AppDatePicker
          control={_hookFormControl}
          name={"stepOne.dateOfJoing"}
          datePickerProps={{
            label: "Date of Joining",
            // value: getValues("stepOne.dateOfJoing") || null,
            value: null,
          }}
          errorHandlingProps={{
            formError: errors.stepOne?.dateOfJoing,
          }}
        />
        <GenderDropdown register={register} errors={errors} />
        <AppDatePicker
          control={_hookFormControl}
          name={"stepOne.dob"}
          datePickerProps={{
            label: "Date of Birth",
            // value: getValues("stepOne.dob") || null,
            value: null,
          }}
          errorHandlingProps={{
            formError: errors.stepOne?.dob,
          }}
        />
        <TextField
          label="Enter Address"
          variant="outlined"
          fullWidth
          {...register("stepOne.address")}
          error={!!errors.stepOne?.address}
          helperText={errors.stepOne?.address?.message ?? ""}
        />
        <TextField
          label="Enter Notes"
          variant="outlined"
          fullWidth
          {...register("stepOne.notes")}
          error={!!errors.stepOne?.notes}
          helperText={errors.stepOne?.notes?.message ?? ""}
        />
        {/* TODO: keep either of "Next" or "Back" button */}
        <Button onClick={onNext}>Next</Button>
        <DevTool control={_hookFormControl} /> {/* set up the dev tool */}
      </Box>
    );
  }
);
