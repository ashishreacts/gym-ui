import { SelectField } from "@/components/Elements";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "./schema";

const mappings = {
  // TODO: add mappings
  // mappings is nothing but object of displayValue: (string or num)-Value/Enum.Variant
  // e.g.
  "Morning batch": "30f6cfd8-11c3-4fb2-b238-8a69981c2e5a",
  "My 1st project": "f0d4e8c4-d790-43fe-abec-24cf718d6a2a",
  "Ashish Jadhav": "0bcc4ec9-302e-4794-97c7-8c1a42c3a63c",
};

export const BatchIdDropdown: React.FC<{
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
        label="Batch Name"
        registration={register("stepTwo.batchId")}
        formError={errors.stepTwo?.batchId}
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
