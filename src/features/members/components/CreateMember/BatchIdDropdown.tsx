import { SelectField } from "@/components/Elements";
import { useBatchList } from "@/features/batches";
import { PaginationQuery } from "@/types/api";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "./schema";

export const BatchIdDropdown: React.FC<{
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  gymId: string;
}> = ({ register, errors, gymId }) => {
  const pagination: PaginationQuery = { page: 1, pageSize: 10 };
  const { data, isLoading, error } = useBatchList({ pagination, gymId });

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Error is loading</div>;

  const options = data?.data.records.map((batch) => ({
    label: batch.name,
    value: batch.id,
  }));

  const defaultValue = options && options.length > 0 ? options[0].value : "";

  const Component = () => {
    return (
      <SelectField
        label="Batch Name"
        registration={register("stepTwo.batchId")}
        formError={errors.stepTwo?.batchId}
        defaultValue={defaultValue}
        options={options || []}
      />
    );
  };

  return <Component />;
};
