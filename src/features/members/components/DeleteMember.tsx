import { Delete } from "@mui/icons-material";
import { ListItemIcon, MenuItem } from "@mui/material";
import React from "react";
import { useDeleteMember } from "../api";
import { MemberListItem } from "../api/types";

type Props = {
  data: MemberListItem;
  onSuccess: () => void;
};

export const DeleteMember: React.FC<Props> = ({ data }) => {
  const api = useDeleteMember();
  const deleteMemberHandler = async () => {
    await api.mutateAsync({
      gymId: data.gymId,
      id: data.id,
    });
  };
  return (
    <MenuItem
      onClick={() => {
        deleteMemberHandler();
      }}
    >
      <ListItemIcon>
        <Delete color="error" />
      </ListItemIcon>
      Delete
    </MenuItem>
  );
};
