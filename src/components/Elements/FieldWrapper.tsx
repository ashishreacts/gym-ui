import { FormHelperText, InputLabel } from "@mui/material";
import clsx from "clsx";
import * as React from "react";
import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  formError?: FieldError | undefined;
};

// when FieldWrapper is used in other component
// FieldWrapperPassThroughProps allows other component's props
// to have className & children of its own
export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, formError, children } = props;

  return (
    <>
      {label && <InputLabel className={clsx(className)}>{label}</InputLabel>}
      {children}
      {formError?.message && (
        <FormHelperText error>{formError.message}</FormHelperText>
      )}
    </>
  );
};
