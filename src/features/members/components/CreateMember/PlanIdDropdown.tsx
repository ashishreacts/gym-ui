import { SelectField } from "@/components/Elements";
import { usePlanList } from "@/features/plans";
import { PaginationQuery } from "@/types/api";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "./schema";

export const PlanIdDropdown: React.FC<{
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  gymId: string;
}> = ({ register, errors, gymId }) => {
  const pagination: PaginationQuery = { page: 1, pageSize: 10 };
  const { data, isLoading, isError } = usePlanList({ pagination, gymId });

  if (isLoading) return <div>Loading.....</div>;
  if (isError) return <div>Error is Loading</div>;

  const options = data?.data.records.map((plans) => ({
    label: plans.name,
    value: plans.id,
  }));

  const defaultValue = options && options.length > 0 ? options[0].value : "";

  const Component = () => {
    return (
      <SelectField
        label="Plan Name"
        registration={register("stepTwo.planId")}
        formError={errors.stepTwo?.planId}
        defaultValue={defaultValue}
        options={options || []}
      />
    );
  };

  return <Component />;
};
