/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Controller, ControllerProps } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

// ommitting render here, because we will be implementing it here
type PassthroughPropsForController = Omit<ControllerProps<any, any>, "render">;

type CustomDatePickerProps = DatePickerProps<any, any>;

export type AppDatePickerProps = PassthroughPropsForController & {
  // DatePicker props here
  datePickerProps: CustomDatePickerProps;
  errorHandlingProps: FieldWrapperPassThroughProps;
};
export const AppDatePicker: React.FC<AppDatePickerProps> = ({
  datePickerProps,
  errorHandlingProps,
  ...props // Controller props of type PassthroughPropsForController
}) => {
  return (
    <FieldWrapper formError={errorHandlingProps.formError}>
      <Controller
        {...props}
        render={({ field }) => {
          return (
            <DatePicker
              {...datePickerProps}
              inputRef={field.ref}
              onChange={(date) => {
                field.onChange(date);
              }}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};
