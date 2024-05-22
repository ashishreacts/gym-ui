import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MemberList } from "./MemberList";

export const MemberListPage = () => {
  const navigate = useNavigate();

  return (
    <Stack>
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/app/member/create`);
        }}
      >
        <Typography>Create Member</Typography>
      </Button>
      <MemberList />
    </Stack>
  );
};
