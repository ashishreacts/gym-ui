import { Delete } from "@mui/icons-material";
import { ListItemIcon, MenuItem } from "@mui/material";
import { PlanListItem } from "../api/types";
import { useDeletePlan } from "../api";

type Props = {
  data: PlanListItem;
  onSuccess: () => void;
};

export const DeletePlan: React.FC<Props> = ({ data }) => {
  const api = useDeletePlan();

  const deletePlanHandler = async () => {
    await api.mutateAsync({
      gymId: data.gymId,
      id: data.id,
    });
  };
  return (
    <MenuItem
      onClick={() => {
        // doSomething();
        deletePlanHandler();
      }}
    >
      <ListItemIcon>
        <Delete color="error" />
      </ListItemIcon>
      Delete
    </MenuItem>
  );
};
