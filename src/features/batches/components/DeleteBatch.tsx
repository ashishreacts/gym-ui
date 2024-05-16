import React from "react";
import { BatchListItem } from "../api/types";
import { Delete } from "@mui/icons-material";
import { MenuItem, ListItemIcon } from "@mui/material";
import { useDeleteBatch } from "../api/DeleteBatch";

type Props = {
  data: BatchListItem;
  onSuccess: () => void;
};
export const DeleteBatch: React.FC<Props> = ({ data }) => {
  const api = useDeleteBatch();

  const deleteBatchHandler = async () => {
    await api.mutateAsync({
      gymId: data.gymId,
      id: data.id,
    });
  };
  return (
    <MenuItem
      onClick={() => {
        deleteBatchHandler();
      }}
    >
      <ListItemIcon>
        <Delete color="error" />
      </ListItemIcon>
      Delete
    </MenuItem>
  );
};
