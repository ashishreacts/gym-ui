import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MemberList } from "./MemberList";

export const MemberListPage = () => {
  const navigate = useNavigate();

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Button
          variant="contained"
          sx={{ width: "13rem" }}
          onClick={() => {
            navigate(`/app/member/create`);
          }}
        >
          <Typography>Create Member</Typography>
        </Button>
      </Stack>
      <MemberList />
    </Stack>
  );
};
