import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { CreateGym } from "../components/CreateGym";
import { GymList } from "../components/GymList";

export const GymListPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Stack>
      <Button variant="contained" onClick={handleOpen}>
        <Typography>Create Plan</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateGym onSuccess={() => console.log("Hello")} />
        </Box>
      </Modal>
      <GymList />
    </Stack>
  );
};
