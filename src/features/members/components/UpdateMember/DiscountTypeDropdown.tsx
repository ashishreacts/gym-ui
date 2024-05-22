import { SelectField } from "@/components/Elements";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "./schema";

const mappings = {
  // TODO: add mappings
  // mappings is nothing but object of displayValue: (string or num)-Value/Enum.Variant
  // e.g.
  Amount: "AMOUNT",
  Percentage: "PERCENTAGE",
};

export const DiscountTypeDropdown: React.FC<{
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}> = ({ register, errors }) => {
  // TODO: set default value
  // valid defaultValue is - a key from mappings object defined as above
  const defaultValue =
    mappings[Object.keys(mappings)[0] as keyof typeof mappings];

  const Component = () => {
    return (
      <SelectField
        label="LABEL"
        registration={register("stepTwo.discountType")}
        formError={errors.stepTwo?.discountType}
        defaultValue={defaultValue}
        options={Object.entries(mappings).map(([displayValue, value]) => ({
          label: displayValue,
          value: value,
        }))}
      />
    );
  };

  return <Component />;
};
