import { Refresh } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";

type Props = {
  api: UseQueryResult<unknown, Error>;
};

export const RefetchTableData: React.FC<Props> = ({ api }) => {
  return (
    <Tooltip arrow title="Refresh Data">
      <IconButton onClick={() => api.refetch()}>
        <Refresh />
      </IconButton>
    </Tooltip>
  );
};
