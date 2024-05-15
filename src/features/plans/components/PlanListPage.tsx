import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PlanList } from "./PlanList";

export const PlanListPage = () => {
  const navigate = useNavigate();
  return (
    <Stack>
      <Button variant="contained" onClick={() => navigate("/app/plans/create")}>
        <Typography>Create Plan</Typography>
      </Button>
      <PlanList />
    </Stack>
  );
};
