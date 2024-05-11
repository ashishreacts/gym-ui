import { MenuItem, Select, SelectProps } from "@mui/material";
import clsx from "clsx";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type SelectValueType = string | number | string[];

type Option = {
  label: React.ReactNode;
  value: SelectValueType;
};

type SelectFieldProps = SelectProps &
  // error type from SelectProps is overridden by FieldWrapperPassThroughProps here
  FieldWrapperPassThroughProps & {
    options: Option[];
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

export const SelectField = (props: SelectFieldProps) => {
  const {
    label,
    options,
    formError,
    className,
    registration,
    ...otherSelectProps
  } = props;

  return (
    <FieldWrapper label={label} formError={formError}>
      <Select
        fullWidth
        className={clsx(className)}
        {...registration}
        {...otherSelectProps}
      >
        {options.map(({ label, value }: Option, index) => (
          <MenuItem key={index} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FieldWrapper>
  );
};
