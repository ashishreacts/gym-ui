import { SelectField } from "@/components/Elements";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "./schema";

const mappings = {
  // TODO: add mappings
  // mappings is nothing but object of displayValue: (string or num)-Value/Enum.Variant
  // e.g.
  "Six month plan": "21004943-ae89-4d68-a4f9-1c42c52e5fff",
  "My 1st project": "43e175d7-b937-47e2-bff7-5189a37403dc",
  "Ashish Jadhav": "ef9d3e04-30ae-4955-9e7a-ce86681a7ee9",
};

export const PlanIdDropdown: React.FC<{
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
        label="Plan Name"
        registration={register("stepTwo.planId")}
        formError={errors.stepTwo?.planId}
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
