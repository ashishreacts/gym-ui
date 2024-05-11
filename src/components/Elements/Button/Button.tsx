import {
  CircularProgress,
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";
import clsx from "clsx";

type ButtonProps = MUIButtonProps & {
  // Add any additional props specific to CustomButton
  isLoading?: boolean;
};

export const Button = ({
  className,
  children,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <MUIButton className={clsx(className)} {...props}>
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </MUIButton>
  );
};
